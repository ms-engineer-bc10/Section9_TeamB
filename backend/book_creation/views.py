import os
import logging
from django.conf import settings
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Book, StoryPrompt, Page
from .serializers import BookSerializer, StoryPromptSerializer
from accounts.models import Child
from tellings.models import TellingRecord
from picturebook_generation.story_generator import generate_story, generate_book_title
from picturebook_generation.image_generator import generate_images
from picturebook_generation.pdf_generator import create_storybook_pdf

logger = logging.getLogger(__name__)

# Telling recordを使用する記述は現時点で一旦削除しています

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['post'])
    def create_book(self, request):
        child_id = request.data.get('child_id')
        
        try:
            child = Child.objects.get(id=child_id)
        except Child.DoesNotExist:
            logger.error(f"Invalid child ID {child_id}")
            return Response({"error": "Invalid child ID"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            logger.info(f"Generating story for child {child_id}")
            story_pages = generate_story(child)
            
            logger.info("Generating images for the story")
            image_urls = generate_images(story_pages, child)
            
            logger.info("Generating book title")
            book_title = generate_book_title(child)
            
            pdf_path = os.path.join(settings.MEDIA_ROOT, f'{book_title}.pdf')
            logger.info(f"Generating PDF at {pdf_path}")
            pdf_content = create_storybook_pdf(image_urls, story_pages, book_title, pdf_path)
            
            logger.info("Creating book instance in database")
            book = Book.objects.create(
                user=request.user,
                child=child,
                title=book_title,
                cover_image_url=image_urls[0] if image_urls else "",
                is_original=True,
                pdf_file=pdf_content,
                is_pdf_generated=True,
                pdf_generated_at=timezone.now()
            )
            
            logger.info("Creating page instances for the book")
            for i, (content, image_url) in enumerate(zip(story_pages, image_urls)):
                Page.objects.create(
                    book=book,
                    page_number=i,
                    content=content,
                    image_url=image_url
                )
            
            serializer = self.get_serializer(book)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error in book creation: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(pdf_path):
                os.remove(pdf_path)
                logger.info(f"Removed temporary PDF file: {pdf_path}")

    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        book = self.get_object()
        if not book.pdf_file:
            logger.warning(f"PDF not found for book ID {pk}")
            return Response({"error": "PDF not found"}, status=status.HTTP_404_NOT_FOUND)

        response = HttpResponse(book.pdf_file, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{book.title}.pdf"'

        book.last_downloaded_at = timezone.now()
        book.pdf_download_count += 1
        book.save()

        logger.info(f"PDF downloaded for book ID {pk}. Total downloads: {book.pdf_download_count}")
        return response

class StoryPromptViewSet(viewsets.ModelViewSet):
    queryset = StoryPrompt.objects.all()
    serializer_class = StoryPromptSerializer