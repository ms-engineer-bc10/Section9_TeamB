import os
from PIL import Image
from io import BytesIO
from django.core.management.base import BaseCommand
from accounts.models import Child, CustomUser
from tellings.models import TellingRecord
from book_creation.models import Book
from picturebook_generation import generate_story, generate_book_title, generate_images, create_storybook_pdf
from django.utils import timezone
from django.conf import settings

class Command(BaseCommand):
    help = 'Test OpenAI API integration, save generated images, and create PDF'

    def save_images(self, image_data_list):
        # 保存先ディレクトリの作成
        save_dir = os.path.join(settings.MEDIA_ROOT, 'generated_images')
        os.makedirs(save_dir, exist_ok=True)

        saved_paths = []
        for i, image_data in enumerate(image_data_list):
            if isinstance(image_data, BytesIO):
                image = Image.open(image_data)
                file_path = os.path.join(save_dir, f'image_{i+1}.png')
                image.save(file_path)
                saved_paths.append(file_path)
                self.stdout.write(self.style.SUCCESS(f"画像を保存しました: {file_path}"))
            else:
                self.stdout.write(self.style.ERROR(f"無効な画像データ: {type(image_data)}"))

        return saved_paths

    def handle(self, *args, **kwargs):
        # テスト用のユーザーを作成または取得
        user, created = CustomUser.objects.get_or_create(
            email='testuser@example.com',
            defaults={'is_active': True}
        )

        # テスト用の子供データを作成
        child, created = Child.objects.get_or_create(
            name="ゆうきくん",
            user=user,
            defaults={
                'birth_date': timezone.now().date(),
                'gender': 'boy',
                'background_type': 'special_adoption',
                'interests': 'dinosaurs, space',
                'family_structure': 'Two adoptive parents',
                'origin_background': 'Born to young parents who couldn\'t care for a child',
                'care_background': 'Adopted at 6 months old'
            }
        )

        # テスト用のBookを作成
        book, created = Book.objects.get_or_create(
            user=user,
            child=child,
            defaults={
                'title': 'Test Book',
                'cover_image_url': 'https://example.com/cover.jpg',
                'is_original': True
            }
        )

        # テスト用のTellingRecordを作成
        telling_record, created = TellingRecord.objects.get_or_create(
            user=user,
            child=child,
            book=book,
            defaults={
                'telling_date': timezone.now()
            }
        )

        self.stdout.write(self.style.SUCCESS('テストデータ作成完了'))

        # ストーリー生成をテスト
        self.stdout.write('ストーリー生成中...')
        story_pages = generate_story(child, telling_record)
        self.stdout.write(self.style.SUCCESS('ストーリー生成完了:'))
        for i, page in enumerate(story_pages, 1):
            self.stdout.write(f'Page {i}: {page[:100]}...')  # 各ページの最初の100文字を表示

        # タイトル生成をテスト
        self.stdout.write('タイトル生成中...')
        book_title = generate_book_title(child, telling_record)
        self.stdout.write(self.style.SUCCESS(f'タイトル生成完了: {book_title}'))

        # 画像生成をテスト
        self.stdout.write('画像生成中...')
        image_data_list = generate_images(story_pages, child, book_title)
        self.stdout.write(self.style.SUCCESS('画像生成完了:'))
        for i, image_data in enumerate(image_data_list, 1):
            self.stdout.write(f'Image {i}: {type(image_data)}')

        # 画像を保存
        self.stdout.write('画像を保存中...')
        saved_image_paths = self.save_images(image_data_list)
        self.stdout.write(self.style.SUCCESS(f'{len(saved_image_paths)}個の画像を保存しました'))

        # PDF生成
        self.stdout.write('PDF生成中...')
        pdf_dir = os.path.join(settings.MEDIA_ROOT, 'generated_books')
        os.makedirs(pdf_dir, exist_ok=True)
        pdf_path = os.path.join(pdf_dir, f'{book_title}.pdf')
        
        create_storybook_pdf(saved_image_paths, story_pages, book_title, pdf_path)
        self.stdout.write(self.style.SUCCESS(f'PDFを生成しました: {pdf_path}'))

        self.stdout.write(self.style.SUCCESS('全てのテストが完了しました'))