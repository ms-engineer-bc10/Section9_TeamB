import os
import logging
from celery import shared_task
from django.conf import settings
from django.utils import timezone
from PIL import Image
from io import BytesIO

from .models import Book, Page, Child
from picturebook_generation.story_generator import generate_story, generate_book_title
from picturebook_generation.image_generator import generate_images
from picturebook_generation.pdf_generator import create_storybook_pdf

logger = logging.getLogger(__name__)

@shared_task(bind=True)
def create_book_task(self, user_id, child_id):
    try:
        child = Child.objects.get(id=child_id, user_id=user_id)
        
        self.update_state(state='PROGRESS', meta={'step': 'Generating story'})
        story_pages = generate_story(child)
        
        self.update_state(state='PROGRESS', meta={'step': 'Generating title'})
        book_title = generate_book_title(child)
        
        self.update_state(state='PROGRESS', meta={'step': 'Generating images'})
        image_data_list = generate_images(story_pages, child, book_title)
        
        temp_image_paths = []
        for i, image_data in enumerate(image_data_list):
            if isinstance(image_data, BytesIO):
                temp_path = os.path.join(settings.MEDIA_ROOT, f'temp_image_{i}.png')
                image = Image.open(image_data)
                image.save(temp_path, 'PNG')
                temp_image_paths.append(temp_path)
        
        self.update_state(state='PROGRESS', meta={'step': 'Creating PDF'})
        pdf_path = os.path.join(settings.MEDIA_ROOT, f'{book_title}.pdf')
        pdf_content = create_storybook_pdf(temp_image_paths, story_pages, book_title, pdf_path)
        
        self.update_state(state='PROGRESS', meta={'step': 'Saving to database'})
        book = Book.objects.create(
            user_id=user_id,
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
        
        # Clean up temporary files
        for path in temp_image_paths:
            if os.path.exists(path):
                os.remove(path)
        if os.path.exists(pdf_path):
            os.remove(pdf_path)
        
        return {'book_id': book.id}
    except Exception as e:
        logger.error(f"Error in book creation task: {str(e)}")
        raise