from rest_framework import viewsets
from accounts.models import CustomUser, Child
from accounts.serializers import CustomUserSerializer, ChildSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer