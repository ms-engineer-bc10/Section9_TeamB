from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, PermissionDenied
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from accounts.decorators import firebase_token_required
from accounts.models import CustomUser
from .models import TellingRecord
from .serializers import TellingRecordSerializer

@method_decorator(csrf_exempt, name='dispatch')
class TellingRecordViewSet(viewsets.ModelViewSet):
    queryset = TellingRecord.objects.all()
    serializer_class = TellingRecordSerializer
    permission_classes = [AllowAny]

    @firebase_token_required
    def list(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        try:
            user = CustomUser.objects.get(firebase_uid=firebase_uid)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # 認証されたユーザーに紐づく記録のみを取得
        records = TellingRecord.objects.filter(user=user)
        serializer = self.get_serializer(records, many=True)
        return Response(serializer.data)

    @firebase_token_required
    def create(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        try:
            user = CustomUser.objects.get(firebase_uid=firebase_uid)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": "Validation failed", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    @firebase_token_required
    def retrieve(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        try:
            user = CustomUser.objects.get(firebase_uid=firebase_uid)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        instance = self.get_object()
        if instance.user != user:
            return Response(
                {"error": "Permission denied"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @firebase_token_required
    def update(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        try:
            user = CustomUser.objects.get(firebase_uid=firebase_uid)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        instance = self.get_object()
        if instance.user != user:
            return Response(
                {"error": "Permission denied"}, 
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=kwargs.pop('partial', False)
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(
            {"error": "Validation failed", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    @firebase_token_required
    def destroy(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        try:
            user = CustomUser.objects.get(firebase_uid=firebase_uid)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        instance = self.get_object()
        if instance.user != user:
            return Response(
                {"error": "Permission denied"}, 
                status=status.HTTP_403_FORBIDDEN
            )

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        """ユーザーに紐づくTellingRecordのみを返す"""
        if not hasattr(self.request, 'firebase_user'):
            return TellingRecord.objects.none()
        
        try:
            user = CustomUser.objects.get(firebase_uid=self.request.firebase_user['uid'])
            return TellingRecord.objects.filter(user=user)
        except CustomUser.DoesNotExist:
            return TellingRecord.objects.none()

    def perform_create(self, serializer):
        pass  # createメソッドで直接処理するため、ここでは何もしない