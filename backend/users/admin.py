from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from users.models import VerifyEmail
from users.forms import UserChangeForm, UserCreationForm

User = get_user_model()
admin.site.register(VerifyEmail)


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name", "bio", "birth_date", "gender", "profile_picture")}),) + auth_admin.UserAdmin.fieldsets
    list_display = ["id", "username", "name", "is_superuser"]
    search_fields = ["name"]
