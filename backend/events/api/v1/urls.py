from django.urls import path, include
from rest_framework import routers
from events.api.v1.viewsets import EventViewSet, IntroViewSet, CategoryViewSet, SubCategoryView

router = routers.DefaultRouter()
router.register('all_event', EventViewSet, basename='all_event')
router.register('intro', IntroViewSet, basename='intro')
router.register('category', CategoryViewSet, basename='category')
router.register('event_type', SubCategoryView, basename='event_type')


urlpatterns = [
    path('', include(router.urls)),
]
