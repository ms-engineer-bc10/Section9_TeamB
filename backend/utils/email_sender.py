from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_email(to_email, subject, message):
    """
    Generic email sending function.
    """
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [to_email],
            fail_silently=False,
        )
        logger.info(f"メールを {to_email} に送信しました。件名: {subject}")
        return True
    except Exception as e:
        logger.error(f"メール送信中にエラーが発生しました: {e}")
        return False

def send_book_completion_email(user_email, book_title):
    subject = f"Tellryの絵本PDFが生成されました"
    message = f"""
    Tellryをご利用いただきありがとうございます。
    あなたが作成された絵本「{book_title}」のPDFが生成されました。
    サービスページにログインすると、PDFをダウンロードいただけます。
    https://tellry.net
    Tellry運営チーム
    """.strip()  
    return send_email(user_email, subject, message)

# リマインダー機能は今後実装予定
# def send_reminder_email(user_email, reminder_text): 