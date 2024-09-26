from rest_framework import serializers
from .models import TellingRecord, TellingReminder

class TellingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TellingRecord
        fields = '__all__'
        read_only_fields = ['id']

class TellingReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = TellingReminder
        fields = '__all__'
        read_only_fields = ['id']