import stripe
from django.conf import settings
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from home.api.v1.serializers import UserSerializer
from home.models import StorageAllowed, DiscountCode, UsedCouponCode


def remove_duplicate_cards(card, user_cards, request):
    global latest_card
    fingerprint = card.get("fingerprint")
    new_data = []
    if user_cards.data:
        for i in user_cards.data:
            if i['fingerprint'] == fingerprint:
                new_data.append(i)
    if len(new_data) > 1:
        for i in new_data:
            if card['id'] == i['id']:
                latest_card = i
            else:
                card_id = i['id']
                stripe.Customer.delete_source(request.user.stripe_customer_id, card_id)
        return latest_card
    return card


class V2LoginViewSet(ViewSet):
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
        return Response({"token": token.key, "user": user_serializer.data, "user_subscriptions": user_subscriptions})


class V2PaymentViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    stripe.api_key = settings.STRIPE_SECRET_KEY

    def get_subscription(self, customer_id):
        return stripe.Subscription.list(customer=customer_id, limit=1)

    @action(detail=False, methods=['get'])
    def get_plans(self, request):
        return Response(stripe.Plan.list(active=True))

    @action(methods=['GET'], detail=False)
    def get_stripe_products(self, request):
        products = stripe.Product.list()
        products["data"] = products.data[::-1]
        return Response(products, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def create_card(self, request):
        data = request.data
        name = data['name']
        card_number = data['card_num']
        cvc = data['cvc']
        expiry_month = data['expiry_month']
        expiry_year = data['expiry_year']
        try:
            token = stripe.Token.create(card={
                'name': name,
                'number': card_number,
                'exp_month': expiry_month,
                'exp_year': expiry_year,
                'cvc': cvc,
            })
            new_card = stripe.Customer.create_source(self.request.user.stripe_customer_id, source=token.id)
            user_cards = stripe.Customer.list_sources(request.user.stripe_customer_id)
            final_card = remove_duplicate_cards(new_card, user_cards, request)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        return Response(final_card)

    @action(methods=['GET'], detail=False)
    def subscription_list(self, request):
        user_subscriptions = stripe.Subscription.list(customer=request.user.stripe_customer_id, limit=1)
        return Response(user_subscriptions)

    @action(detail=False, methods=['post'])
    def create_subscription(self, request):
        plan = request.data.get("product_id")
        coupon = request.data.get("coupon")
        subscription_type = request.data.get('subscription_name', None)
        is_save = request.data.get("save")
        if plan and subscription_type:
            cus_sub = stripe.Subscription.list(customer=request.user.stripe_customer_id, limit=1)
            used_storage = StorageAllowed.objects.filter(user=request.user)
            used_coupon = UsedCouponCode.objects.filter(customer=request.user, coupon_code=coupon)
            if cus_sub:
                cus_sub = cus_sub.data[0]
            kwargs = {
                'customer': request.user.stripe_customer_id,
                'items': [
                    {"price": request.data['product_id']},
                ],
                "coupon": coupon
            }
            if used_coupon:
                kwargs["coupon"] = None
            try:
                subscription = stripe.Subscription.create(**kwargs)
                if not used_coupon and coupon:
                    UsedCouponCode.objects.create(customer=request.user, coupon_code=coupon)
                if subscription_type == 'Free':
                    if cus_sub:
                        stripe.Subscription.delete(cus_sub.id)
                    if used_storage:
                        used_storage.delete()
                    StorageAllowed.objects.create(
                        user=request.user, subscription_name=subscription_type, allotted_storage=2048,
                        available_storage=2048)
                if subscription_type == 'Basic':
                    if cus_sub:
                        stripe.Subscription.delete(cus_sub.id)
                    if used_storage:
                        used_storage.delete()
                    StorageAllowed.objects.create(
                        user=request.user, subscription_name=subscription_type, allotted_storage=51200,
                        available_storage=51200)
                elif subscription_type == 'Premium':
                    if cus_sub:
                        stripe.Subscription.delete(cus_sub.id)
                    if used_storage:
                        used_storage.delete()
                    StorageAllowed.objects.create(
                        user=request.user, subscription_name=subscription_type, allotted_storage=512000,
                        available_storage=512000)
            except stripe.error.InvalidRequestError as E:
                return Response(str(E), status=status.HTTP_400_BAD_REQUEST)
            if not is_save:
                card_detail = stripe.Customer.list_sources(self.request.user.stripe_customer_id, object="card", limit=3)
                if card_detail.data:
                    card_id = card_detail.data[0].id
                    stripe.Customer.delete_source(self.request.user.stripe_customer_id, card_id)
            subscription["subscribed"] = True
            return Response(subscription)
        return Response('', status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['DELETE'], detail=False)
    def remove_subscription(self, request):
        try:
            plan = request.data.get("subscription_id")
            cancel = stripe.Subscription.delete(plan)
            storage = StorageAllowed.objects.filter(user=request.user).first()
            if storage:
                storage.delete()
            cancel["subscribed"] = False
            return Response(cancel)
        except stripe.error.InvalidRequestError as E:
            return Response(str(E), status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['DELETE'], detail=False)
    def delete_card(self, request):
        customer = self.request.user.stripe_customer_id
        card_id = request.data.get('card_id')
        card = stripe.Customer.delete_source(customer, card_id)
        return Response(card)

    @action(methods=['GET'], detail=False)
    def list_cards(self, request):
        user = self.request.user.stripe_customer_id
        user_cards = stripe.Customer.list_sources(user, object='card', limit=3)
        return Response(user_cards)

    @action(methods=["POST"], detail=False)
    def apply_coupon(self, request):
        coupon = request.data.get("coupon")
        coupon_exist = DiscountCode.objects.filter(name=coupon, active=True)
        used_coupon = UsedCouponCode.objects.filter(customer=request.user, coupon_code=coupon)
        if coupon_exist and not used_coupon:
            data = stripe.Coupon.retrieve(coupon)
            return Response(data, status=status.HTTP_200_OK)
        return Response({"msg": "Invalid or Expired Code"}, status=status.HTTP_400_BAD_REQUEST)
