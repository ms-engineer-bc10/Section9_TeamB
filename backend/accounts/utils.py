import firebase_admin
from firebase_admin import auth
from firebase_admin.auth import InvalidIdTokenError, ExpiredIdTokenError
from django.http import JsonResponse
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

def extract_token(auth_header):
    if auth_header.startswith('Bearer '):
        return auth_header.split('Bearer ')[1]
    raise ValueError("Invalid Authorization header format. Must start with 'Bearer '")

def verify_firebase_token(id_token):
    try:
        print(f"受け取ったトークン: {id_token}")
        
        id_token = extract_token(id_token)

        # トークンの検証
        decoded_token = auth.verify_id_token(id_token)
        print("トークンが正常に検証されました:", decoded_token)
        return decoded_token

    except (InvalidIdTokenError, ExpiredIdTokenError) as e:
        print(f"Firebaseトークン検証エラー: {str(e)}")
        return None

    except ValueError as ve:
        print(f"トークン抽出エラー: {str(ve)}")
        return None

    except Exception as e:
        print(f"予期しないエラー: {str(e)}")
        return None

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data['status_code'] = response.status_code

    if isinstance(exc, PermissionDenied):
        return Response({
            "error": "You do not have permission to perform this action.",
            "status_code": status.HTTP_403_FORBIDDEN
        }, status=status.HTTP_403_FORBIDDEN)

    return response
