from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.utils import timezone
from .models import Book, StoryPrompt, Page
from .serializers import BookSerializer, StoryPromptSerializer
from accounts.models import Child
from tellings.models import TellingRecord
from picturebook_generation.story_generator import generate_story, generate_book_title
from picturebook_generation.image_generator import generate_images
from picturebook_generation.pdf_generator import create_storybook_pdf

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
        
        # PDFの生成
        pdf_content = create_storybook_pdf(image_urls, story_pages, book_title)
        
        # 絵本のインスタンスの生成
        book = Book.objects.create(
            user=request.user,
            child=child,
            story_prompt=telling_record.story_prompt,
            title=book_title,
            cover_image_url=image_urls[0],
            is_original=True,
            pdf_file=pdf_content,
            is_pdf_generated=True,
            pdf_generated_at=timezone.now()
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

    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        book = self.get_object()
        if not book.pdf_file:
            return Response({"error": "PDF not found"}, status=status.HTTP_404_NOT_FOUND)

        response = HttpResponse(book.pdf_file, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{book.title}.pdf"'

        # 更新ダウンロード情報
        book.last_downloaded_at = timezone.now()
        book.pdf_download_count += 1
        book.save()

        return response

class StoryPromptViewSet(viewsets.ModelViewSet):
    queryset = StoryPrompt.objects.all()
    serializer_class = StoryPromptSerializer