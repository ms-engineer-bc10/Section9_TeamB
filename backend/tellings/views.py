from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, PermissionDenied  # 追加
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from accounts.decorators import firebase_token_required
from accounts.utils import verify_firebase_token
from accounts.models import CustomUser
from .models import TellingRecord
from .serializers import TellingRecordSerializer

@method_decorator(csrf_exempt, name='dispatch')
class TellingRecordViewSet(viewsets.ModelViewSet):
    queryset = TellingRecord.objects.all()
    serializer_class = TellingRecordSerializer
    permission_classes = [AllowAny]

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
    def create(self, request, *args, **kwargs):
        user = self.get_user_from_token(request)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @firebase_token_required
    def list(self, request, *args, **kwargs):
        user = self.get_user_from_token(request)
        queryset = TellingRecord.objects.filter(user=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @firebase_token_required
    def retrieve(self, request, *args, **kwargs):
        user = self.get_user_from_token(request)
        instance = self.get_object()
        if instance.user != user:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @firebase_token_required
    def update(self, request, *args, **kwargs):
        user = self.get_user_from_token(request)
        instance = self.get_object()
        if instance.user != user:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @firebase_token_required
    def destroy(self, request, *args, **kwargs):
        user = self.get_user_from_token(request)
        instance = self.get_object()
        if instance.user != user:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        if not hasattr(self.request, 'firebase_user'):
            return TellingRecord.objects.none()
        
        firebase_uid = self.request.firebase_user['uid']
        user = CustomUser.objects.filter(firebase_uid=firebase_uid).first()
        if not user:
            return TellingRecord.objects.none()
            
        return TellingRecord.objects.filter(user=user)