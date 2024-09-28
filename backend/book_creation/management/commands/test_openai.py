from django.core.management.base import BaseCommand
from accounts.models import Child, CustomUser
from tellings.models import TellingRecord
from book_creation.models import Book
from picturebook_generation.story_generator import generate_story, generate_book_title
from picturebook_generation.image_generator import generate_images
from django.utils import timezone

class Command(BaseCommand):
    help = 'Test OpenAI API integration'

    def handle(self, *args, **kwargs):
        # テスト用のユーザーを作成または取得
        user, created = CustomUser.objects.get_or_create(
            email='testuser@example.com',
            defaults={'is_active': True}
        )

        # テスト用の子供データを作成
        child, created = Child.objects.get_or_create(
            name="Test Child",
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
            user=user,  # ここでuserを追加
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
        image_urls = generate_images(story_pages, child)
        self.stdout.write(self.style.SUCCESS('画像生成完了:'))
        for i, url in enumerate(image_urls, 1):
            self.stdout.write(f'Image {i}: {url}')

        self.stdout.write(self.style.SUCCESS('全てのテストが完了しました'))