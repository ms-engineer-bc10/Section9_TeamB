from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Book, StoryPrompt, Page
from .serializers import BookSerializer, StoryPromptSerializer
from accounts.models import Child
from tellings.models import TellingRecord
from picturebook_generation.story_generator import generate_story, generate_book_title
from picturebook_generation.image_generator import generate_images

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['post'])
    def create_book(self, request):
        child_id = request.data.get('child_id')
        telling_record_id = request.data.get('telling_record_id')
        
        try:
            child = Child.objects.get(id=child_id)
            telling_record = TellingRecord.objects.get(id=telling_record_id)
        except (Child.DoesNotExist, TellingRecord.DoesNotExist):
            return Response({"error": "Invalid child or telling record ID"}, status=status.HTTP_400_BAD_REQUEST)
        
        # ストーリーの生成
        story_pages = generate_story(child, telling_record)
        
        # 画像の生成
        image_urls = generate_images(story_pages, child)
        
        # 絵本のタイトルの生成
        book_title = generate_book_title(child, telling_record)
        
        # 絵本のインスタンスの生成
        book = Book.objects.create(
            user=request.user,
            child=child,
            story_prompt=telling_record.story_prompt,
            title=book_title,
            cover_image_url=image_urls[0],
            is_original=True
        )
        
        # ページのインスタンスの生成
        for i, (content, image_url) in enumerate(zip(story_pages, image_urls)):
            Page.objects.create(
                book=book,
                page_number=i,
                content=content,
                image_url=image_url
            )
        
        serializer = self.get_serializer(book)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class StoryPromptViewSet(viewsets.ModelViewSet):
    queryset = StoryPrompt.objects.all()
    serializer_class = StoryPromptSerializer