from rest_framework import serializers
from .models import Book, StoryPrompt

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

class StoryPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryPrompt
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']