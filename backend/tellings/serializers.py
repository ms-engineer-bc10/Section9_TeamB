from rest_framework import serializers
from .models import TellingRecord

class TellingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TellingRecord
        fields = ['id', 'user', 'child', 'book', 'telling_date', 'child_reaction', 'notes']