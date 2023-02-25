from urllib.error import HTTPError

import stripe
from allauth.socialaccount.helpers import complete_social_login
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from django.core.mail import send_mail
from django.template.loader import render_to_string
from users.models import VerifyEmail
# import stripe
import random
from users.models import GENDER
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


def generate_signup_confirm_token():
    # generates token on signup to confirm email
    token = random.randint(1001, 9999)
    return token


def user_signup_send_mail(instance):
    # send an e-mail to the user on signup
    if not instance.is_superuser:
        user_token = generate_signup_confirm_token()
        context = {
            'username': instance.name,
            'token': user_token
        }
        subject = "Welcome to Passages"
        email_html_message = render_to_string('email/signup_confirm_msg.html', context)
        send_mail(subject=subject, message="", html_message=email_html_message, from_email='team@trypassages.com',
                  recipient_list=[instance.email], fail_silently=False)
        VerifyEmail.objects.create(user=instance, token=user_token)


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        try:
            validate_password(password=validated_data.get("password"))
        except Exception as e:
            raise serializers.ValidationError({"password": [list(e)[0]]})
        user = User(
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            username=generate_unique_username([
                validated_data.get('name'),
                validated_data.get('email'),
                'user'
            ])
        )
        user.set_password(validated_data.get('password'))
        customer = stripe.Customer.create(
            description='Customer for {}'.format(validated_data.get('email')),
            email=validated_data.get('email')
        )
        user.stripe_customer_id = customer.stripe_id
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        try:
            stripe.Subscription.create(customer=user.stripe_customer_id, items=[{"price": settings.FREE_SUBSCRIPTION_ID}])
        except:
            pass
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)
    cover_picture = serializers.ImageField(required=False)
    bio = serializers.CharField()
    gender = serializers.ChoiceField(choices=GENDER, required=True)
    birth_date = serializers.DateField(required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'username', 'bio', 'gender', 'profile_picture', 'birth_date', 'cover_picture', 'stripe_customer_id']


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm


class RestSocialLoginSerializer(SocialLoginSerializer):
    id_token = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        view = self.context.get('view')
        request = self._get_request()

        if not view:
            raise serializers.ValidationError(
                _("View is not defined, pass it as a context variable")
            )

        adapter_class = getattr(view, 'adapter_class', None)
        if not adapter_class:
            raise serializers.ValidationError(_("Define adapter_class in view"))

        adapter = adapter_class(request)
        app = adapter.get_provider().get_app(request)

        # More info on code vs access_token
        # http://stackoverflow.com/questions/8666316/facebook-oauth-2-0-code-and-token

        # Case 1: We received the access_token
        if attrs.get('access_token'):
            access_token = attrs.get('access_token')

        # Case 2: We received the authorization code
        elif attrs.get('code'):
            self.callback_url = getattr(view, 'callback_url', None)
            self.client_class = getattr(view, 'client_class', None)

            if not self.callback_url:
                raise serializers.ValidationError(
                    _("Define callback_url in view")
                )
            if not self.client_class:
                raise serializers.ValidationError(
                    _("Define client_class in view")
                )

            code = attrs.get('code')

            provider = adapter.get_provider()
            scope = provider.get_scope(request)
            client = self.client_class(
                request,
                app.client_id,
                app.secret,
                adapter.access_token_method,
                adapter.access_token_url,
                self.callback_url,
                scope
            )
            token = client.get_access_token(code)
            access_token = token['access_token']

        else:
            raise serializers.ValidationError(
                _("Incorrect input. access_token or code is required."))

        social_token = social_token = adapter.parse_token({
            'access_token': access_token,
            'id_token': attrs.get('id_token') # For apple login
        })
        social_token.app = app

        try:
            login = self.get_social_login(adapter, app, social_token, access_token)
            complete_social_login(request, login)
        except HTTPError:
            raise serializers.ValidationError(_("Incorrect value"))

        if not login.is_existing:
            # We have an account already signed up in a different flow
            # with the same email address: raise an exception.
            # This needs to be handled in the frontend. We can not just
            # link up the accounts due to security constraints
            if allauth_settings.UNIQUE_EMAIL:
                # Do we have an account already with this email address?
                account_exists = get_user_model().objects.filter(
                    email=login.user.email,
                ).exists()
                if account_exists:
                    raise serializers.ValidationError(
                        _("User is already registered with this e-mail address.")
                    )

            login.lookup()
            login.save(request, connect=True)

        attrs['user'] = login.account.user

        return attrs