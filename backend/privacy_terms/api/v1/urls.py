from django.urls import path, include
from rest_framework import routers
from .viewsets import PrivacyPolicyViewSet

router = routers.DefaultRouter()
router.register('privacy_terms', PrivacyPolicyViewSet, basename='privacy_terms')
urlpatterns = [
    path('', include(router.urls)),
]
