import stripe
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from users.models import User


class StorageAllowed(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    subscription_name = models.CharField(max_length=100)
    allotted_storage = models.PositiveIntegerField(default=0)
    available_storage = models.FloatField(default=0.0)

    def __str__(self):
        return self.subscription_name

    class Meta:
        verbose_name = 'Storage Allowed'
        verbose_name_plural = 'Storage Allowed'


class DiscountCode(models.Model):
    name = models.CharField(max_length=200)
    value = models.FloatField()
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class UsedCouponCode(models.Model):
    customer = models.ForeignKey(User, related_name="user_coupon", on_delete=models.CASCADE)
    coupon_code = models.CharField(max_length=200)


@receiver(post_save, sender=DiscountCode, dispatch_uid="stripe_discount_code")
def add_coupon(sender, instance, **kwargs):
    try:
        stripe.Coupon.delete(instance.name)
    except:
        pass
    if instance.active:
        stripe.Coupon.create(
            id=instance.name,
            percent_off=instance.value,
            duration="once",
            name=f"{instance.value}% off"
        )


@receiver(post_delete, sender=DiscountCode, dispatch_uid="stripe_discount_code")
def delete_coupon(sender, instance, **kwargs):
    if instance.active:
        stripe.Coupon.delete(instance.name)
