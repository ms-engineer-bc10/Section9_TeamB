from django.urls import path
from . import views

urlpatterns = [
    path(
        "create-checkout-session/",
        views.create_checkout_session,
        name="create-checkout-session",
    ),
    path(
        "membership-status/",
        views.membership_status,
        name="membership-status"
    ),
]
