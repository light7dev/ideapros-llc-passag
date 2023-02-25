from django.urls import path, include
from rest_framework import routers
from events.api.v2.viewsets import V2EventViewSet

router = routers.DefaultRouter()
router.register('all_event', V2EventViewSet, basename='all_event')

urlpatterns = [
    path('', include(router.urls)),
]
