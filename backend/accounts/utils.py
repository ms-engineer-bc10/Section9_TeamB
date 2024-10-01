import firebase_admin
from firebase_admin import auth
from firebase_admin.auth import InvalidIdTokenError, ExpiredIdTokenError
from django.http import JsonResponse

def extract_token(auth_header):
    if auth_header.startswith('Bearer '):
        return auth_header.split('Bearer ')[1]
    raise ValueError("Invalid Authorization header format. Must start with 'Bearer '")

def verify_firebase_token(id_token):
    try:
        print(f"受け取ったトークン: {id_token}")
        
        id_token = extract_token(id_token)
        print(f"'Bearer ' プレフィックス削除後のトークン: {id_token}")

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
