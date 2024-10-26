from rest_framework.response import Response
from rest_framework import status
from accounts.utils import verify_firebase_token

def firebase_token_required(func):
    def wrapper(self, request, *args, **kwargs):
        id_token = request.headers.get('Authorization')
        if not id_token:
            return Response({"error": "Authorizationヘッダーがありません"}, status=status.HTTP_401_UNAUTHORIZED)

        user_info = verify_firebase_token(id_token)
        if not user_info:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)

        request.firebase_user = user_info
        return func(self, request, *args, **kwargs)
    
    return wrapper
