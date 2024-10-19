import logging
from django.http import FileResponse
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, PermissionDenied
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from celery.result import AsyncResult
from celery.exceptions import OperationalError

from accounts.models import Child
from .models import Book, StoryPrompt
from .serializers import BookSerializer, StoryPromptSerializer
from accounts.models import CustomUser
from accounts.decorators import firebase_token_required
from accounts.utils import verify_firebase_token
from payments.models import PaidService
from .tasks import create_book_task

logger = logging.getLogger('book_creation')

@method_decorator(csrf_exempt, name='dispatch')
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]  # 一時的に全てのリクエストを許可

    def get_user_from_token(self, request):
        id_token = request.headers.get('Authorization')
        if not id_token:
            raise PermissionDenied("Authorizationヘッダーがありません")

        user_info = verify_firebase_token(id_token)
        if user_info is None:
            raise PermissionDenied("Invalid or expired token")

        user = CustomUser.objects.filter(firebase_uid=user_info['uid']).first()
        if user is None:
            raise ValidationError("User not found")
        return user

    @firebase_token_required
    def list(self, request, *args, **kwargs):
        # デコレーターを通して検証されたユーザー情報を取得
        firebase_uid = request.firebase_user['uid']
        user = CustomUser.objects.filter(firebase_uid=firebase_uid).first()

        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # 認証済みのユーザーに関連する本のリストを取得
        queryset = Book.objects.filter(user=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @firebase_token_required
    def retrieve(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        user = CustomUser.objects.filter(firebase_uid=firebase_uid).first()
        
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        book = self.get_object()
        if book.user != user:
            raise PermissionDenied("このBookにアクセスする権限がありません。")

        serializer = self.get_serializer(book)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_book(self, request):
        user = self.get_user_from_token(request)
        child_id = request.data.get('child_id')
        
        try:
            child = Child.objects.get(id=child_id, user=user)
        except Child.DoesNotExist:
            logger.error(f"Invalid child ID {child_id}")
            return Response({"error": "Invalid child ID"}, status=status.HTTP_400_BAD_REQUEST)
    
        # PaidServiceのチェック
        paid_service = PaidService.objects.filter(user=user, start_date__lte=timezone.now(), end_date__gte=timezone.now(), status='active').first()
        if not paid_service:
            return Response({"error": "有効なPaidServiceがありません"}, status=status.HTTP_403_FORBIDDEN)

        # books_created が creation_limit を超えていないか確認
        if paid_service.books_created >= paid_service.creation_limit:
            return Response({"error": "絵本の作成上限に達しました"}, status=status.HTTP_403_FORBIDDEN)

        try:
            # 絵本作成タスクの開始
            task = create_book_task.delay(user.id, child.id)
            logger.info(f"絵本作成タスクを開始しました。タスクID: {task.id}")

            # books_created を1増やして保存
            paid_service.books_created += 1
            paid_service.save()

            return Response({"task_id": task.id}, status=status.HTTP_202_ACCEPTED)
        except OperationalError as e:
            logger.error(f"Celeryタスクの作成に失敗しました: {str(e)}")
            return Response({"error": "タスクの作成に失敗しました。しばらくしてからもう一度お試しください。"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:    
            logger.error(f"予期せぬエラーが発生しました: {str(e)}")
            return Response({"error": "予期せぬエラーが発生しました。"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'])
    def check_task_status(self, request):
        task_id = request.query_params.get('task_id')
        if not task_id:
            return Response({"error": "タスクIDが提供されていません"}, status=status.HTTP_400_BAD_REQUEST)
        
        task_result = AsyncResult(task_id)
        if task_result.state == 'SUCCESS':
            response = {
                'state': task_result.state,
                'book_id': task_result.result.get('book_id'),
                'log_info': task_result.result.get('log_info', {})
            }
        elif task_result.state != 'FAILURE':
            response = {
                'state': task_result.state,
                'status': task_result.info.get('step', '')
            }
        else:
            response = {
                'state': task_result.state,
                'status': str(task_result.info),
            }
        return Response(response)

    @firebase_token_required
    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        try:
            book = self.get_object()
            logger.info(f"PDF のダウンロードを試みています。本のID: {pk}")
            
            if not book.pdf_file:
                logger.warning(f"PDF が見つかりません。本のID: {pk}")
                return Response({"error": "PDF not found"}, status=status.HTTP_404_NOT_FOUND)

            try:
                response = FileResponse(book.pdf_file, content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename="{book.title}.pdf"'
            except Exception as e:
                logger.error(f"PDF ファイルの読み込み中にエラーが発生しました。本のID {pk}: {str(e)}")
                return Response({"error": "Error reading PDF file"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            book.last_downloaded_at = timezone.now()
            book.pdf_download_count += 1
            book.save()

            logger.info(f"PDF のダウンロードが成功しました。本のID: {pk}")
            return response
        except Book.DoesNotExist:
            logger.warning(f"本が見つかりません。ID: {pk}")
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"PDF のダウンロード中に予期せぬエラーが発生しました。本のID {pk}: {str(e)}")
            return Response({"error": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StoryPromptViewSet(viewsets.ModelViewSet):
    queryset = StoryPrompt.objects.all()
    serializer_class = StoryPromptSerializer