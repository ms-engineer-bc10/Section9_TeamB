from rest_framework import viewsets
from .models import Payment, PaidService
from .serializers import PaymentSerializer, PaidServiceSerializer
from django.shortcuts import render  # 必要？
import stripe
from django.conf import settings
from django.shortcuts import redirect # 必要？
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from accounts.utils import verify_firebase_token

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class PaidServiceViewSet(viewsets.ModelViewSet):
    queryset = PaidService.objects.all()
    serializer_class = PaidServiceSerializer


stripe.api_key = settings.STRIPE_SECRET_KEY
YOUR_DOMAIN = "http://localhost:3000"


@csrf_exempt
def create_checkout_session(request):
    # Extract the Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({"error": "Authorization header missing"}, status=400)

    # Verify Firebase token and extract email
    decoded_token = verify_firebase_token(auth_header)
    if not decoded_token:
        return JsonResponse({"error": "Invalid or expired Firebase token"}, status=401)

    user_email = decoded_token.get('email')  # Get the email from the decoded token

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            customer_email=user_email,  # Automatically fill the user's email
            line_items=[
                {
                    "price": settings.STRIPE_PRICE_ID,
                    "quantity": 1,
                },
            ],
            mode="payment",
            success_url=YOUR_DOMAIN + "/message",
            cancel_url=YOUR_DOMAIN + "?canceled=true",
        )
        return JsonResponse({"url": checkout_session.url})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)