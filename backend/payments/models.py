from django.db import models
from django.conf import settings
from django.utils import timezone

class PaidService(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='paid_services')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20)
    service_type = models.CharField(max_length=50)
    creation_limit = models.IntegerField()
    books_created = models.IntegerField(default=0)
    last_reset_date = models.DateTimeField()

class FreeService(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    books_created = models.IntegerField()

class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments')
    stripe_uid = models.CharField(max_length=255)
    paid_service = models.ForeignKey(PaidService, on_delete=models.SET_NULL, null=True, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=20)
    payment_date = models.DateTimeField(default=timezone.now)
    coupon_id = models.IntegerField(null=True, blank=True)
    promotion_code = models.CharField(max_length=255, null=True, blank=True)

class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount_amount = models.DecimalField(max_digits=5, decimal_places=2)
    expiry_date = models.DateField()
    stripe_coupon_id = models.CharField(max_length=100)