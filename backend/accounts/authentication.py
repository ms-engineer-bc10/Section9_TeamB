from rest_framework import authentication
from rest_framework import exceptions
from django.contrib.auth import get_user_model
from .utils import verify_firebase_token

User = get_user_model()

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header:
            return None

        decoded_token = verify_firebase_token(auth_header)
        if not decoded_token:
            return None  # 認証失敗時はNoneを返す（例外は発生させない）

        uid = decoded_token["uid"]
        user, created = User.objects.get_or_create(firebase_uid=uid)

        return (user, None)