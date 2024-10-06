from rest_framework import serializers
from .models import Payment, PaidService

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class PaidServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaidService
        fields = '__all__'
