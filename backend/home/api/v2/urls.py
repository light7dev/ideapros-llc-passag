from django.urls import path, include
from rest_framework.routers import DefaultRouter
from home.api.v2.viewsets import (
    V2LoginViewSet, V2PaymentViewSet
)

router = DefaultRouter()
router.register("login", V2LoginViewSet, basename="login")
router.register("stripe_payment", V2PaymentViewSet, basename="stripe_payment")

urlpatterns = [
    path("", include(router.urls)),
]
