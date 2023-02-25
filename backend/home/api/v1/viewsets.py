import stripe
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    RestSocialLoginSerializer,
)
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
# import stripe
# from django.conf import settings
# from home.models import StorageAllowed
from users.models import User
import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from users.models import VerifyEmail
from allauth.socialaccount.models import SocialAccount


# FREE_SUBSCRIPTION_DATA = {
#   "plan": {
#     "metadata": {
#       "advertise": "Virtual time Capsule For Future Messages.",
#       "description": "Passage is free to join so everyone can capture their story.",
#       "discount": "0%",
#       "feature1": "3 Digital Safes with Life Story Timelines.",
#       "feature2": "Virtual time Capsule For Future Messages.",
#       "name": "Free",
#       "storage": "1 GB Storage.",
#       "type": "Personal Vault."
#     }
#   }
# }
# FREE_SUBSCRIPTION_INFO = {
#     "data": [
#         {
#             "plan": {
#                 "id": "price_1L6AHeITCThctn0j6ZfbayF6",
#                 "object": "plan",
#                 "active": "true",
#                 "aggregate_usage": "null",
#                 "amount": 0,
#                 "amount_decimal": "0",
#                 "billing_scheme": "per_unit",
#                 "created": 1654161938,
#                 "currency": "usd",
#                 "interval": "month",
#                 "interval_count": 1,
#                 "livemode": "false",
#                 "metadata": {
#                     "storage": "1 GB Storage.",
#                     "type": "Personal Vault.",
#                     "feature1": "3 Digital Safes with Life Story Timelines.",
#                     "feature2": "Virtual time Capsule For Future Messages.",
#                     "advertise": "Virtual time Capsule For Future Messages.",
#                     "description": "Passage is free to join so everyone can capture their story.",
#                     "discount": "0%",
#                     "name": "Free"
#                 },
#                 "nickname": "null",
#                 "product": "prod_LnlpI81ukSkrRi",
#                 "tiers_mode": "null",
#                 "transform_usage": "null",
#                 "trial_period_days": "null",
#                 "usage_type": "licensed"
#             }
#         }
#     ]
# }


def save_image_from_url(model, url, name):
    r = requests.get(url)
    if r.status_code == 200:
        img_temp = NamedTemporaryFile(delete=True)
        img_temp.write(r.content)
        img_temp.flush()
        model.name = name
        model.profile_picture.save("{}.jpg".format(model.username), File(img_temp), save=True)


# def remove_duplicate_cards(card, user_cards, request):
#     global latest_card
#     fingerprint = card.get("fingerprint")
#     new_data = []
#     if user_cards.data:
#         for i in user_cards.data:
#             if i['fingerprint'] == fingerprint:
#                 new_data.append(i)
#     if len(new_data) > 1:
#         for i in new_data:
#             if card['id'] == i['id']:
#                 latest_card = i
#             else:
#                 card_id = i['id']
#                 stripe.Customer.delete_source(request.user.stripe_customer_id, card_id)
#         return latest_card
#     return card


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        if not user.stripe_customer_id:
            customer = stripe.Customer.create(
                description='Customer for {}'.format(user.email),
                email=user.email
            )
            user.stripe_customer_id = customer.stripe_id
            user.save()
        user_serializer = UserSerializer(user)
        user_subscriptions = stripe.Subscription.list(customer=user_serializer.data.get('stripe_customer_id'), limit=3,
                                                      status='active')
        # subscription_info = user_subscriptions.get('data')
        # if subscription_info:
        #     pass
        # elif not subscription_info and StorageAllowed.objects.filter(user=user):
        #     user_subscriptions = FREE_SUBSCRIPTION_INFO
        # return Response({"token": token.key, "user": user_serializer.data, "user_subscriptions": user_subscriptions})
        return Response({"token": token.key, "user": user_serializer.data, "subscription": user_subscriptions})


class UpdateUserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    http_method_names = ['get', 'patch', 'delete']
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        return queryset


class AllUserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    permission_classes = [AllowAny, ]
    callback_url = "https://developers.google.com/oauthplayground"

    def get_response(self):
        serializer_class = self.get_response_serializer()
        user = self.user
        # if user.stripe_customer_id is None:
        #     customer = stripe.Customer.create(
        #         description='Customer for {}'.format(user.email),
        #         email=user.email
        #     )
        #     stripe_id = customer.stripe_id
        #     user.stripe_customer_id = stripe_id
        #     user.save()
        user_extra_data = SocialAccount.objects.filter(user=self.request.user, provider__contains='google').first().extra_data
        name = user_extra_data["name"]
        if not user.profile_picture:
            profile_image_url = user_extra_data["picture"]
            save_image_from_url(user, profile_image_url, name)
        user_detail = UserSerializer(user, many=False, context={"request": self.request})
        serializer = serializer_class(instance=self.token, context={'request': self.request})
        resp = serializer.data
        resp["token"] = resp["key"]
        resp.pop("key")
        resp["user"] = user_detail.data
        # user_subscriptions = stripe.Subscription.list(customer=user.stripe_customer_id, limit=3, status='active')
        # subscription_info = user_subscriptions.get('data')
        # if subscription_info:
        #     pass
        # elif not subscription_info and StorageAllowed.objects.filter(user=user):
        #     user_subscriptions = FREE_SUBSCRIPTION_INFO
        # resp["user_subscriptions"] = user_subscriptions
        response = Response(resp, status=status.HTTP_200_OK)
        return response


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
    permission_classes = [AllowAny, ]

    def get_response(self):
        serializer_class = self.get_response_serializer()
        user = self.user
        # if user.stripe_customer_id is None:
        #     customer = stripe.Customer.create(
        #         description='Customer for {}'.format(user.email),
        #         email=user.email
        #     )
        #     stripe_id = customer.stripe_id
        #     user.stripe_customer_id = stripe_id
        #     user.save()
        user_extra_data = SocialAccount.objects.filter(user=self.request.user, provider__contains='facebook').first().extra_data
        name = user_extra_data["name"]
        if not user.profile_picture:
            try:
                profile_image_url = user_extra_data["picture"]["data"]["url"]
                save_image_from_url(user, profile_image_url, name)
            except Exception as e:
                print(e)
        user_detail = UserSerializer(user, many=False)
        serializer = serializer_class(instance=self.token, context={'request': self.request})
        resp = serializer.data
        resp["token"] = resp["key"]
        resp.pop("key")
        resp["user"] = user_detail.data
        # user_subscriptions = stripe.Subscription.list(customer=user.stripe_customer_id, limit=3, status='active')
        # subscription_info = user_subscriptions.get('data')
        # if subscription_info:
        #     pass
        # elif not subscription_info and StorageAllowed.objects.filter(user=user):
        #     user_subscriptions = FREE_SUBSCRIPTION_INFO
        # resp["user_subscriptions"] = user_subscriptions
        response = Response(resp, status=status.HTTP_200_OK)
        return response


class AppleLogin(SocialLoginView):
    authentication_classes = []
    permission_classes = [AllowAny]
    adapter_class = AppleOAuth2Adapter
    serializer_class = RestSocialLoginSerializer

    def get_response(self):
        serializer_class = self.get_response_serializer()
        user = self.user
        user_detail = UserSerializer(user, many=False)
        serializer = serializer_class(instance=self.token, context={'request': self.request})
        # if user.stripe_customer_id is None:
        #     stripe_customer = stripe.Customer.create(
        #         description="Customer for {}".format(user.email),
        #         email=user.email
        #     )
        #     user.stripe_customer_id = stripe_customer.stripe_id
        #     user.save()
        # user_subscriptions = stripe.Subscription.list(customer=user.stripe_customer_id, limit=3)
        resp = serializer.data
        resp["user"] = user_detail.data
        resp["token"] = resp["key"]
        # subscription_info = user_subscriptions.get('data')
        # if subscription_info:
        #     pass
        # elif not subscription_info and StorageAllowed.objects.filter(user=user):
        #     user_subscriptions = FREE_SUBSCRIPTION_INFO
        # resp["user_subscriptions"] = user_subscriptions
        response = Response(resp, status=status.HTTP_200_OK)
        return response


# class PaymentViewSet(ViewSet):
#     permission_classes = [IsAuthenticated]
#     stripe.api_key = settings.STRIPE_SECRET_KEY
#
#     def get_subscription(self, customer_id):
#         return stripe.Subscription.list(customer=customer_id, limit=1)
#
#     @action(detail=False, methods=['get'])
#     def get_plans(self, request):
#         return Response(stripe.Plan.list())
#
#     @action(methods=['GET'], detail=False)
#     def get_stripe_products(self, request):
#         products = stripe.Product.list()
#         return Response(products, status=status.HTTP_200_OK)
#
#     @action(methods=['POST'], detail=False)
#     def create_card(self, request):
#         data = request.data
#         name = data['name']
#         card_number = data['card_num']
#         cvc = data['cvc']
#         expiry_month = data['expiry_month']
#         expiry_year = data['expiry_year']
#         try:
#             token = stripe.Token.create(card={
#                 'name': name,
#                 'number': card_number,
#                 'exp_month': expiry_month,
#                 'exp_year': expiry_year,
#                 'cvc': cvc,
#             })
#             new_card = stripe.Customer.create_source(self.request.user.stripe_customer_id, source=token.id)
#             user_cards = stripe.Customer.list_sources(request.user.stripe_customer_id)
#             final_card = remove_duplicate_cards(new_card, user_cards, request)
#         except Exception as e:
#             return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
#         return Response(final_card)
#
#     @action(methods=['GET'], detail=False)
#     def subscription_list(self, request):
#         user_subscriptions = stripe.Subscription.list(customer=request.user.stripe_customer_id, limit=1)
#         subscription_info = user_subscriptions.get('data')
#         if subscription_info:
#             pass
#         elif not subscription_info and StorageAllowed.objects.filter(user=self.request.user):
#             user_subscriptions = FREE_SUBSCRIPTION_INFO
#         return Response(user_subscriptions)
#
#     @action(detail=False, methods=['post'])
#     def create_subscription(self, request):
#         plan = request.data.get("product_id")
#         subscription_type = request.data.get('subscription_name', None)
#         if plan and subscription_type:
#             cus_sub = self.get_subscription(request.user.stripe_customer_id)
#             used_storage = StorageAllowed.objects.filter(user=request.user)
#             if cus_sub:
#                 cus_sub = cus_sub.data[0]
#             kwargs = {
#                 'customer': request.user.stripe_customer_id,
#                 'items': [
#                     {"price": request.data['product_id']},
#                 ],
#             }
#             if subscription_type == 'Free':
#                 if cus_sub:
#                     stripe.Subscription.delete(cus_sub.id)
#                 StorageAllowed.objects.create(
#                     user=request.user, subscription_name=subscription_type, allotted_storage=1024,
#                     available_storage=1024)
#                 return Response(FREE_SUBSCRIPTION_DATA)
#             try:
#                 subscription = stripe.Subscription.create(**kwargs)
#                 if cus_sub:
#                     stripe.Subscription.delete(cus_sub.id)
#                 if used_storage and subscription_type != 'Free':
#                     used_storage.delete()
#             except stripe.error.InvalidRequestError as E:
#                 return Response(str(E), status=status.HTTP_400_BAD_REQUEST)
#
#             return Response(subscription)
#         return Response('', status=status.HTTP_400_BAD_REQUEST)
#
#     @action(methods=['DELETE'], detail=False)
#     def remove_subscription(self, request):
#         plan = request.data.get("subscription_id")
#         cancel = stripe.Subscription.delete(plan)
#         return Response(cancel)
#
#     @action(methods=['DELETE'], detail=False)
#     def delete_card(self, request):
#         customer = self.request.user.stripe_customer_id
#         card_id = request.data.get('card_id')
#         card = stripe.Customer.delete_source(customer, card_id)
#         return Response(card)
#
#     @action(methods=['GET'], detail=False)
#     def list_cards(self, request):
#         user = self.request.user.stripe_customer_id
#         user_cards = stripe.Customer.list_sources(user, object='card', limit=3)
#         return Response(user_cards)


class EmailVerificationViewSet(ViewSet):
    permission_classes = [AllowAny]

    @action(methods=['post'], detail=False)
    def verify_user_email(self, request):
        token = self.request.data.get('token')
        email = self.request.data.get('email')
        try:
            data = VerifyEmail.objects.get(user__email=email, token=token)
            if data:
                data.delete()
                return Response("Email Confirmed", status=status.HTTP_200_OK)
        except Exception as e:
            return Response("Invalid Token", status=status.HTTP_404_NOT_FOUND)


class SuperUserViewSet(ViewSet):
    http_method_names = ["post"]

    @action(detail=False, methods=['post'])
    def create_super_user(self, request):
        user_data = self.request.data
        super_user = User.objects.create(email=user_data.get('email'), name=user_data.get('name'),
                                         username=user_data.get('username'))
        super_user.set_password(user_data.get('password'))
        super_user.is_superuser = True
        super_user.is_staff = True
        super_user.is_active = True
        super_user.save()
        return Response('Admin Access Granted')
