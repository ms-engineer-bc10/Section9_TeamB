from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets
from accounts.models import CustomUser, Child
from accounts.serializers import CustomUserSerializer, ChildSerializer
from accounts.utils import verify_firebase_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError, PermissionDenied

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

    def perform_create(self, serializer):
        id_token = self.request.headers.get('Authorization')
        
        # トークンが正しく受信されているか確認
        print(f"受信したトークン: {id_token}")

        if not id_token:
            raise PermissionDenied("Authorizationヘッダーがありません")

        user_info = verify_firebase_token(id_token)
        
        if user_info is None:
            raise PermissionDenied("Invalid or expired token")

        user = CustomUser.objects.filter(firebase_uid=user_info['uid']).first()

        if user is None:
            raise ValidationError("User not found")

        serializer.save(user=user)

    def create(self, request, *args, **kwargs):
        """オーバーライドしてCSRF免除のために明示的に記載"""
        return super().create(request, *args, **kwargs)
