from rest_framework import viewsets
from .models import Book, StoryPrompt
from .serializers import BookSerializer, StoryPromptSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        return Book.objects.filter(user=self.request.user)

class StoryPromptViewSet(viewsets.ModelViewSet):
    queryset = StoryPrompt.objects.all()
    serializer_class = StoryPromptSerializer

    def get_queryset(self):
        return StoryPrompt.objects.filter(child__user=self.request.user)