from rest_framework import serializers
from .models import TellingRecord, TellingReminder

class TellingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TellingRecord
        fields = ['id', 'child', 'book', 'telling_date', 'child_reaction', 'notes', 'user']
        read_only_fields = ['id', 'user']
        extra_kwargs = {
            'child': {'required': True},
            'telling_date': {'required': True},
            'child_reaction': {'required': True},
            'book': {'required': False, 'allow_null': True},
            'notes': {'required': False, 'allow_null': True}
        }

    def validate_telling_date(self, value):
        """日付のバリデーションと変換"""
        if isinstance(value, str):
            try:
                from datetime import datetime
                from django.utils import timezone
                # ISO形式の文字列をパースしてUTCとして解釈
                parsed_date = datetime.fromisoformat(value.replace('Z', '+00:00'))
                return timezone.make_aware(parsed_date)
            except ValueError as e:
                raise serializers.ValidationError(f"Invalid date format: {str(e)}")
        return value

class TellingReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = TellingReminder
        fields = '__all__'
        read_only_fields = ['id']