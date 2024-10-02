from rest_framework import serializers
from .models import Book, StoryPrompt, Page

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['page_number', 'content', 'image_url']

class BookSerializer(serializers.ModelSerializer):
    pdf_available = serializers.SerializerMethodField()
    pages = PageSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'cover_image_url', 'lead_message', 'pdf_available',
                  'is_pdf_generated', 'pdf_generated_at', 'last_downloaded_at', 
                  'pdf_download_count', 'created_at', 'updated_at', 'is_original',
                  'user', 'child', 'paid_service', 'story_prompt', 'pages']
        read_only_fields = ['id', 'created_at', 'updated_at', 'pdf_available']

    def get_pdf_available(self, obj):
        return bool(obj.pdf_file)

class StoryPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryPrompt
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']