import os
import logging
import time
from datetime import timedelta
from celery import shared_task
from django.conf import settings
from django.utils import timezone
from PIL import Image
from io import BytesIO

from accounts.models import Child
from .models import Book, Page
from picturebook_generation.story_generator import generate_story, generate_book_title
from picturebook_generation.image_generator import generate_images
from picturebook_generation.pdf_generator import create_storybook_pdf

logger = logging.getLogger('book_creation')

@shared_task(bind=True)
def create_book_task(self, user_id, child_id):
    start_time = time.time()
    log_info = {}
    
    try:
        logger.info(f"絵本作成タスク開始 - ユーザーID: {user_id}, 子どもID: {child_id}")
        child = Child.objects.get(id=child_id, user_id=user_id)
        
        self.update_state(state='PROGRESS', meta={'step': 'ストーリー生成中'})
        story_start_time = time.time()
        logger.info("ストーリー生成開始")
        story_pages = generate_story(child)
        story_end_time = time.time()
        story_time = timedelta(seconds=story_end_time - story_start_time)
        log_info['story_generation_time'] = str(story_time)
        logger.info(f"ストーリー生成完了 - 所要時間: {story_time}")
        
        self.update_state(state='PROGRESS', meta={'step': 'タイトル生成中'})
        title_start_time = time.time()
        logger.info("タイトル生成開始")
        book_title = generate_book_title(child)
        title_end_time = time.time()
        title_time = timedelta(seconds=title_end_time - title_start_time)
        log_info['title_generation_time'] = str(title_time)
        logger.info(f"タイトル生成完了: {book_title} - 所要時間: {title_time}")
        
        self.update_state(state='PROGRESS', meta={'step': '画像生成中'})
        images_start_time = time.time()
        logger.info("画像生成開始")
        image_data_list = generate_images(story_pages, child, book_title)
        images_end_time = time.time()
        images_time = timedelta(seconds=images_end_time - images_start_time)
        log_info['image_generation_time'] = str(images_time)
        logger.info(f"画像生成完了 - 所要時間: {images_time}")
        logger.info(f"生成された画像の数: {len(image_data_list)}")
        
        temp_image_paths = []
        for i, image_data in enumerate(image_data_list):
            if isinstance(image_data, BytesIO):
                temp_path = os.path.join(settings.MEDIA_ROOT, f'temp_image_{i}.png')
                image = Image.open(image_data)
                image.save(temp_path, 'PNG')
                temp_image_paths.append(temp_path)
                logger.info(f'一時画像ファイル保存: {temp_path}')
        
        self.update_state(state='PROGRESS', meta={'step': 'PDF作成中'})
        pdf_start_time = time.time()
        logger.info("PDF生成開始")
        pdf_path = os.path.join(settings.MEDIA_ROOT, f'{book_title}.pdf')
        pdf_content = create_storybook_pdf(temp_image_paths, story_pages, book_title, pdf_path)
        pdf_end_time = time.time()
        pdf_time = timedelta(seconds=pdf_end_time - pdf_start_time)
        log_info['pdf_creation_time'] = str(pdf_time)
        logger.info(f"PDFを生成しました: {pdf_path} - 所要時間: {pdf_time}")
        
        self.update_state(state='PROGRESS', meta={'step': 'データベースに保存中'})
        logger.info("データベースへの保存開始")
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
        logger.info("データベースへの保存完了")
        
        # 一時ファイルの削除
        for path in temp_image_paths:
            if os.path.exists(path):
                os.remove(path)
                logger.info(f"一時画像ファイルを削除しました: {path}")
        if os.path.exists(pdf_path):
            os.remove(pdf_path)
            logger.info(f"一時PDFファイルを削除しました: {pdf_path}")
        
        end_time = time.time()
        total_time = timedelta(seconds=end_time - start_time)
        log_info['total_generation_time'] = str(total_time)
        logger.info(f"絵本の生成完了 - 本のID: {book.id}")
        logger.info(f"絵本の生成完了 - 合計時間: {total_time}")
        
        return {'book_id': book.id, 'log_info': log_info}
    except Exception as e:
        logger.error(f"絵本作成中にエラーが発生しました: {str(e)}")
        raise