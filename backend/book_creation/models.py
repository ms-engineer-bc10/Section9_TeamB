from django.db import models
from django.conf import settings
from django.utils import timezone

class StoryTemplate(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

class TemplatePage(models.Model):
    story_template = models.ForeignKey(StoryTemplate, on_delete=models.CASCADE, related_name='pages')
    page_number = models.IntegerField()
    content = models.TextField()
    image_url = models.URLField()

class StoryPrompt(models.Model):
    child = models.ForeignKey('accounts.Child', on_delete=models.CASCADE, related_name='story_prompts')
    telling_record = models.ForeignKey('tellings.TellingRecord', on_delete=models.CASCADE) 
    prompt_template = models.TextField()
    prompt_variables = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

class Book(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='books')
    child = models.ForeignKey('accounts.Child', on_delete=models.CASCADE, related_name='books')
    paid_service = models.ForeignKey('payments.PaidService', on_delete=models.CASCADE, null=True)
    story_prompt = models.ForeignKey(StoryPrompt, on_delete=models.SET_NULL, null=True, related_name='books')
    story_template = models.ForeignKey(StoryTemplate, on_delete=models.SET_NULL, null=True, related_name='books')
    title = models.CharField(max_length=50)
    cover_image_url = models.URLField()
    lead_message = models.TextField()
    pdf_file_path = models.CharField(max_length=255)
    is_pdf_generated = models.BooleanField(default=False)
    pdf_generated_at = models.DateField(default=timezone.now, null=True, blank=True)
    last_downloaded_at = models.DateField(default=timezone.now, null=True, blank=True)
    pdf_download_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_original = models.BooleanField(default=False)

class Page(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='pages')
    page_number = models.IntegerField()
    content = models.TextField()
    image_url = models.URLField()

    def __str__(self):
        return self.name