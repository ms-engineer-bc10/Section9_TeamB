from rest_framework import serializers
from .models import CustomUser, Child

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'firebase_uid', 'is_active', 'is_staff', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class ChildSerializer(serializers.ModelSerializer):
     class Meta:
        model = Child
        fields = '__all__'
        read_only_fields = ['id', 'user']