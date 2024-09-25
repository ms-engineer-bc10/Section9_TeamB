from django.db import models
from django.conf import settings
from accounts.models import Child

class TellingRecord(models.Model):
    telling_date = models.DateTimeField()
    child_reaction = models.TextField()
    notes = models.TextField()

class TellingReminder(models.Model):
    reminder_date = models.DateTimeField()
    is_sent = models.BooleanField(default=False)

