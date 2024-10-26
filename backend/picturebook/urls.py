from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import CustomUserViewSet, ChildViewSet
from book_creation.views import BookViewSet, StoryPromptViewSet
from tellings.views import TellingRecordViewSet #TellingReminderViewSet
from payments.views import PaymentViewSet, PaidServiceViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'children', ChildViewSet)
router.register(r'books', BookViewSet)
router.register(r'story-prompts', StoryPromptViewSet)
router.register(r'telling-records', TellingRecordViewSet)
# router.register(r'telling-reminders', TellingReminderViewSet)　あとで実装予定
router.register(r'payments', PaymentViewSet)
router.register(r'paid-services', PaidServiceViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
    path('api/superuser/', CustomUserViewSet.as_view({'post': 'create_superuser'})),
    path("stripe/", include("payments.urls")),
    path('api/books/create_book/', BookViewSet.as_view({'post': 'create_book'}), name='create-book'),
    path('api/books/<int:pk>/download-pdf/', BookViewSet.as_view({'get': 'download_pdf'}), name='book-download-pdf'),
    path('api/books/check_task_status/', BookViewSet.as_view({'get': 'check_task_status'}), name='check-task-status'),  # 新しいエンドポイント
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)