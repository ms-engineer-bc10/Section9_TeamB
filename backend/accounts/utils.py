import firebase_admin
from firebase_admin import auth
from firebase_admin.auth import InvalidIdTokenError, ExpiredIdTokenError
from django.http import JsonResponse

def verify_firebase_token(id_token):
    try:
        print(f"受け取ったトークン: {id_token}")  # トークンをログに出力

        # 'Bearer ' プレフィックスを削除
        if id_token.startswith('Bearer '):
            id_token = id_token.split('Bearer ')[1]
            print(f"'Bearer ' プレフィックス削除後のトークン: {id_token}")  # Bearer削除後のトークンをログに出力
        
        # トークンの検証
        decoded_token = auth.verify_id_token(id_token)
        print("トークンが正常に検証されました:", decoded_token)
        return decoded_token

    except Exception as e:
        print(f"トークン検証エラー: {str(e)}")  # エラーメッセージをログに出力
        return None
