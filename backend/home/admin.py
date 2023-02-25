from django.contrib import admin
from home.models import StorageAllowed, DiscountCode, UsedCouponCode

# Register your models here.


class StorageAllowedAdmin(admin.ModelAdmin):
    list_display = ['id', 'subscription_name', 'user', 'allotted_storage', 'available_storage']


class DiscountCodeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'value', 'active']


class UsedCouponAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'coupon_code']


admin.site.register(StorageAllowed, StorageAllowedAdmin)
admin.site.register(DiscountCode, DiscountCodeAdmin)
admin.site.register(UsedCouponCode, UsedCouponAdmin)


