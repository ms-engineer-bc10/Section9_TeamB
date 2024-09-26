from rest_framework import viewsets
from .models import TellingRecord
from .serializers import TellingRecordSerializer

class TellingRecordViewSet(viewsets.ModelViewSet):
    queryset = TellingRecord.objects.all()
    serializer_class = TellingRecordSerializer

    def get_queryset(self):
        return TellingRecord.objects.filter(user=self.request.user)