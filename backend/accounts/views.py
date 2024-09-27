from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets  # これを追加
from accounts.models import CustomUser, Child
from accounts.serializers import CustomUserSerializer, ChildSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=False, methods=['post'], url_path='superuser')
    def create_superuser(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.create_superuser(email=email, password=password)
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        firebase_uid = request.data.get('firebase_uid')

        if CustomUser.objects.filter(email=email).exists():
            return Response({"error": "このメールアドレスは既に登録されています。"}, status=status.HTTP_400_BAD_REQUEST)

        if not email or not firebase_uid:
            return Response({'error': 'Email and firebase_uid are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.create_firebase_user(email=email, firebase_uid=firebase_uid)
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer