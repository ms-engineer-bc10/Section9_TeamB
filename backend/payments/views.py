from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils import timezone
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
from .models import Payment, PaidService
from .serializers import PaymentSerializer, PaidServiceSerializer
from accounts.decorators import firebase_token_required
from accounts.utils import verify_firebase_token
from accounts.models import CustomUser
from rest_framework.decorators import api_view

# StripeのAPIキーを設定
stripe.api_key = settings.STRIPE_SECRET_KEY
YOUR_DOMAIN = "http://localhost:3000"


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    @firebase_token_required
    def create(self, request, *args, **kwargs):
        # デコレーターによって検証されたユーザー情報を使用
        firebase_uid = request.firebase_user['uid']
        
        # ユーザーを取得または作成
        user, created = CustomUser.objects.get_or_create(firebase_uid=firebase_uid)

        # 既存のPaidServiceを確認
        existing_service = PaidService.objects.filter(user=user).order_by('-end_date').first()
    
        # 既存のサービスがあり、かつ有効期限が過ぎていない場合、そのまま使用
        if existing_service and existing_service.end_date > timezone.now():
            return Response({'detail': 'Service is still active.'}, status=status.HTTP_400_BAD_REQUEST)

       # 既存のサービスが有効期限を過ぎている、または作成回数が10回を超えている場合、新しいサービスを作成
        paid_service_data = {
            "user": user,
            "start_date": timezone.now(),
            "end_date": timezone.now() + timezone.timedelta(days=30),
            "status": "active",  # 固定値
            "service_type": "standard",
            "creation_limit": 10,
            "books_created": 0,
            "last_reset_date": timezone.now()
        }

        if existing_service:
            # 既存のサービスを更新
            for key, value in paid_service_data.items():
                setattr(existing_service, key, value)
            existing_service.save()
            paid_service = existing_service
        else:
            # 新しいサービスを作成
            paid_service = PaidService.objects.create(**paid_service_data)

        # 支払い情報の仮の値を設定
        payment_data = {
            "user": user.id,
            "stripe_uid": "test_stripe_uid",  # StripeのUIDは仮の値
            "paid_service": paid_service.id,  # 作成されたPaidServiceのID
            "amount": 980.00, 
            "payment_method": "credit_card",  # 仮の支払い方法
            "status": "paid",  # 仮のステータス
            "payment_date": timezone.now(),
            "coupon_id": None,
            "promotion_code": None
        }

        # シリアライザーでデータを検証し、保存
        serializer = self.get_serializer(data=payment_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # 正常なレスポンスを返す
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PaidServiceViewSet(viewsets.ModelViewSet):
    queryset = PaidService.objects.all()
    serializer_class = PaidServiceSerializer

    @firebase_token_required
    def list(self, request, *args, **kwargs):
        firebase_uid = request.firebase_user['uid']
        user = CustomUser.objects.filter(firebase_uid=firebase_uid).first()

        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # 該当ユーザーに紐づくPaidServiceを取得
        queryset = PaidService.objects.filter(user=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



@csrf_exempt
def create_checkout_session(request):
    # Firebaseトークンの検証
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({"error": "Authorization header missing"}, status=400)

    decoded_token = verify_firebase_token(auth_header)
    if not decoded_token:
        return JsonResponse({"error": "Invalid or expired Firebase token"}, status=401)

    # ユーザーのメールアドレスを取得
    user_email = decoded_token.get('email')

    try:
        # Stripe Checkoutセッションの作成
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            customer_email=user_email,
            line_items=[{
                "price": settings.STRIPE_PRICE_ID,
                "quantity": 1,
            }],
            mode="payment",
            success_url=YOUR_DOMAIN + "/checkout-success",
            cancel_url=YOUR_DOMAIN + "?canceled=true",
        )
        return JsonResponse({"url": checkout_session.url})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



@api_view(['GET'])
def membership_status(request):
    # Firebaseトークンの検証
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return Response({"error": "Authorization header missing"}, status=400)

    decoded_token = verify_firebase_token(auth_header)
    if not decoded_token:
        return Response({"error": "Invalid or expired Firebase token"}, status=401)

    # `firebase_uid`を使用してユーザーを特定
    firebase_uid = decoded_token.get('user_id')
    user = CustomUser.objects.filter(firebase_uid=firebase_uid).first()
    if not user:
        return Response({"error": "User not found"}, status=404)

    # 現在の日付を取得
    today = timezone.now()

    # 該当ユーザーのPaidServiceを確認
    paid_service = PaidService.objects.filter(user=user).order_by('-end_date').first()

    if paid_service and paid_service.end_date > today:
        return Response({"status": "standard"}, status=200)
    else:
        return Response({"status": "light"}, status=200)
