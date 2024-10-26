from django.db import models
from django.conf import settings
from accounts.models import Child

class TellingRecord(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='telling_records'
    )
    child = models.ForeignKey(
        'accounts.Child', 
        on_delete=models.CASCADE
    )
    book = models.ForeignKey(
        'book_creation.Book', 
        on_delete=models.CASCADE, 
        related_name='telling_records', 
        null=True, 
        blank=True  
    )
    telling_date = models.DateField()
    child_reaction = models.TextField()
    notes = models.TextField(
        null=True, 
        blank=True  
        
    )

class TellingReminder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='telling_reminders')
    child = models.ForeignKey('accounts.Child', on_delete=models.CASCADE)
    book = models.ForeignKey('book_creation.Book', on_delete=models.CASCADE, related_name='telling_reminders')
    reminder_date = models.DateTimeField()
    is_sent = models.BooleanField(default=False)