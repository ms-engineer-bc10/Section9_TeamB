from rest_framework import serializers
from .models import Book, StoryPrompt

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'user', 'child', 'cover_image_url', 'created_at', 'updated_at']

class StoryPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryPrompt
        fields = ['id', 'child', 'telling_record', 'prompt_template', 'prompt_variables', 'created_at', 'updated_at']