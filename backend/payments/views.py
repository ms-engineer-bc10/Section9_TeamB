from rest_framework import viewsets
from .models import Payment, PaidService
from .serializers import PaymentSerializer, PaidServiceSerializer
from django.shortcuts import render  # 必要？
import stripe
from django.conf import settings
from django.shortcuts import redirect # 必要？
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price": settings.STRIPE_PRICE_ID,
                    "quantity": 1,
                },
            ],
            mode="payment",
            success_url=YOUR_DOMAIN + "/message",
            cancel_url=YOUR_DOMAIN + "?canceled=true",  # 変更が必要
        )
        return JsonResponse({"url": checkout_session.url})
    except Exception as e:
        return JsonResponse({"error": str(e)})
