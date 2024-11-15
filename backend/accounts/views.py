from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets
from accounts.models import CustomUser, Child
from accounts.serializers import CustomUserSerializer, ChildSerializer
from accounts.decorators import firebase_token_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.permissions import AllowAny

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=False, methods=['post'], url_path='superuser')
    def create_superuser(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            raise ValidationError({'error': 'Email and password are required'})

        try:
            user = CustomUser.objects.create_superuser(email=email, password=password)
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            raise ValidationError({'error': str(e)})

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        firebase_uid = request.data.get('firebase_uid')

        if CustomUser.objects.filter(email=email).exists():
            raise ValidationError({"error": "このメールアドレスは既に登録されています。"})

        if not email or not firebase_uid:
            raise ValidationError({'error': 'Email and firebase_uid are required'})

        try:
            user = CustomUser.objects.create_firebase_user(email=email, firebase_uid=firebase_uid)
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            raise ValidationError({'error': str(e)})


@method_decorator(csrf_exempt, name='dispatch')
class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer
    permission_classes = [AllowAny]  # 一時的に全てのリクエストを許可

    @firebase_token_required
    def list(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        try:
            user = CustomUser.objects.get(firebase_uid=firebase_uid)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # 認証されたユーザーに紐づく子ども情報のみを取得
        children = Child.objects.filter(user=user)
        serializer = self.get_serializer(children, many=True)
        return Response(serializer.data)

    @firebase_token_required
    def create(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        user, created = CustomUser.objects.get_or_create(firebase_uid=firebase_uid)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        pass  # createメソッドで直接処理するため、ここでは何もしない