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
        fields = ['name', 'birth_date', 'gender', 'interests', 'background_type', 
                  'background_other', 'origin_background', 'care_background', 
                  'family_structure', 'father_title', 'mother_title']