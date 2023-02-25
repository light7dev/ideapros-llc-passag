from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.


class PrivacyPolicy(models.Model):
    name = models.CharField(max_length=250)
    description = RichTextField()

    def __str__(self):
        return self.name
