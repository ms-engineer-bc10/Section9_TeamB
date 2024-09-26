from rest_framework import viewsets
from .models import TellingRecord, TellingReminder
from .serializers import TellingRecordSerializer, TellingReminderSerializer

class TellingRecordViewSet(viewsets.ModelViewSet):
    queryset = TellingRecord.objects.all()
    serializer_class = TellingRecordSerializer

class TellingReminderViewSet(viewsets.ModelViewSet):
    queryset = TellingReminder.objects.all()
    serializer_class = TellingReminderSerializer