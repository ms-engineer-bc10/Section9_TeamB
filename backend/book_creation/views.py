import os
from io import BytesIO
import logging
from django.conf import settings
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from PIL import Image

from .models import Book, StoryPrompt, Page
from .serializers import BookSerializer, StoryPromptSerializer
from accounts.models import Child
from picturebook_generation.story_generator import generate_story, generate_book_title
from picturebook_generation.image_generator import generate_images
from picturebook_generation.pdf_generator import create_storybook_pdf
from .utils.logger import book_logger

logger = logging.getLogger(__name__)

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['post'])
    def create_book(self, request):
        child_id = request.data.get('child_id')
        
        try:
            child = Child.objects.get(id=child_id)
        except Child.DoesNotExist:
            book_logger.error(f"Invalid child ID {child_id}")
            return Response({"error": "Invalid child ID"}, status=status.HTTP_400_BAD_REQUEST)
        
        pdf_path = None 
        temp_image_paths = []
        
        try:
            book_logger.start_process("ストーリー生成")
            story_pages = generate_story(child)
            book_logger.end_process("ストーリー生成")
            for i, page in enumerate(story_pages, 1):
                book_logger.info(f'Page {i}: {page[:100]}...')
            
            book_logger.start_process("タイトル生成")
            book_title = generate_book_title(child)
            book_logger.success(f"タイトル生成完了: {book_title}")
            
            book_logger.start_process("画像生成")
            image_data_list = generate_images(story_pages, child, book_title)
            book_logger.end_process("画像生成")
            book_logger.info(f"生成された画像の数: {len(image_data_list)}")
            
            # BytesIOオブジェクトを一時的な画像ファイルとして保存
            for i, image_data in enumerate(image_data_list):
                if isinstance(image_data, BytesIO):
                    temp_path = os.path.join(settings.MEDIA_ROOT, f'temp_image_{i}.png')
                    image = Image.open(image_data)
                    image.save(temp_path, 'PNG')
                    temp_image_paths.append(temp_path)
                    book_logger.info(f'Temporary image saved: {temp_path}')
                else:
                    book_logger.error(f'Unexpected image data type: {type(image_data)}')
            
            pdf_path = os.path.join(settings.MEDIA_ROOT, f'{book_title}.pdf')
            book_logger.start_process("PDF生成")
            pdf_content = create_storybook_pdf(temp_image_paths, story_pages, book_title, pdf_path)
            book_logger.success(f"PDFを生成しました: {pdf_path}")
            
            book_logger.start_process("データベースへの保存")
            book = Book.objects.create(
                user=request.user,
                child=child,
                title=book_title,
                cover_image_url=temp_image_paths[0] if temp_image_paths else "",
                is_original=True,
                pdf_file=pdf_content,
                is_pdf_generated=True,
                pdf_generated_at=timezone.now()
            )
            
            for i, (content, image_path) in enumerate(zip(story_pages, temp_image_paths)):
                Page.objects.create(
                    book=book,
                    page_number=i,
                    content=content,
                    image_url=image_path
                )
            book_logger.end_process("データベースへの保存")
            
            serializer = self.get_serializer(book)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            book_logger.error(f"Error in book creation: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            # 一時ファイルの削除
            for path in temp_image_paths:
                if os.path.exists(path):
                    os.remove(path)
                    book_logger.info(f"Removed temporary image file: {path}")
            if pdf_path and os.path.exists(pdf_path):
                os.remove(pdf_path)
                book_logger.info(f"Removed temporary PDF file: {pdf_path}")

    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        book = self.get_object()
        if not book.pdf_file:
            book_logger.warning(f"PDF not found for book ID {pk}")
            return Response({"error": "PDF not found"}, status=status.HTTP_404_NOT_FILE)

        response = HttpResponse(book.pdf_file, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{book.title}.pdf"'

        book.last_downloaded_at = timezone.now()
        book.pdf_download_count += 1
        book.save()

        book_logger.info(f"PDF downloaded for book ID {pk}. Total downloads: {book.pdf_download_count}")
        return response

class StoryPromptViewSet(viewsets.ModelViewSet):
    queryset = StoryPrompt.objects.all()
    serializer_class = StoryPromptSerializer