from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_firebase_user(self, email, firebase_uid, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not firebase_uid:
            raise ValueError('The Firebase UID must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, firebase_uid=firebase_uid, **extra_fields)
        user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    firebase_uid = models.CharField(max_length=255, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

class Child(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='children')
    name = models.CharField(max_length=50)
    birth_date = models.DateField()
    arrival_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20)
    interests = models.TextField(null=True, blank=True)
    background_type = models.CharField(max_length=20)
    origin_background = models.TextField(null=True, blank=True)
    care_background = models.TextField(null=True, blank=True)
    family_structure = models.TextField(null=True, blank=True)
    father_title = models.CharField(max_length=50, null=True, blank=True)
    mother_title = models.CharField(max_length=50, null=True, blank=True)