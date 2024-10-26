import datetime
from rest_framework import serializers
from .models import TellingRecord, TellingReminder

# serializers.py
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
                # YYYY-MM-DD形式の文字列をパース
                return datetime.strptime(value, '%Y-%m-%d').date()
            except ValueError as e:
                raise serializers.ValidationError(f"Invalid date format. Use YYYY-MM-DD: {str(e)}")
        return value

class TellingReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = TellingReminder
        fields = '__all__'
        read_only_fields = ['id']