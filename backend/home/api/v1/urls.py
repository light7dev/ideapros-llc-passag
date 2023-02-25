from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_auth.views import PasswordChangeView
from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet, UpdateUserViewSet, GoogleLogin, FacebookLogin, AllUserViewSet,
    EmailVerificationViewSet, AppleLogin
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("update_user_profile", UpdateUserViewSet, basename="update")
# router.register("stripe_payment", PaymentViewSet, basename="stripe_payment")
router.register("all-user", AllUserViewSet, basename="all_user")
router.register("verify_email", EmailVerificationViewSet, basename="verify_email")


urlpatterns = [
    path("", include(router.urls)),
    path("password/change/", PasswordChangeView.as_view(), name='rest_password_change'),
    path("password/reset/", include('django_rest_passwordreset.urls', namespace='password_reset')),
    re_path(r'^login/google/$', GoogleLogin.as_view(), name='google_login'),
    re_path(r'^login/facebook/$', FacebookLogin.as_view(), name='facebook_login'),
    re_path(r'^login/apple/$', AppleLogin.as_view(), name='apple_login'),
]
