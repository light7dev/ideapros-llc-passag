from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives, send_mail
from django.db.models import signals
import random
# from django.contrib.admin.models import


def generate_signup_confirm_token():
    token = random.randint(1001, 9999)
    return token


GENDER = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
)


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    profile_picture = models.ImageField(upload_to='profile_pic/', null=True, blank=True)
    cover_picture = models.ImageField(upload_to='cover_pic/', null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=250, null=True, blank=True)
    bio = models.CharField(max_length=500, default='')
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(choices=GENDER, null=True,  max_length=6, blank=True)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class VerifyEmail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.IntegerField()

    def __str__(self):
        return self.user.email


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # send an e-mail to the user
    context = {
        'username': reset_password_token.user.get_full_name,
        'reset_password_token': reset_password_token.key
    }
    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)
    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Passage app"),
        # message:
        email_plaintext_message,
        # from:
        "team@trypassages.com",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
