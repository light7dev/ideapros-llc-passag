# Generated by Django 2.2.27 on 2022-04-01 13:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0005_category_screen_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='images',
            name='event',
        ),
        migrations.RemoveField(
            model_name='videos',
            name='event',
        ),
        migrations.DeleteModel(
            name='AddMoreText',
        ),
        migrations.DeleteModel(
            name='Images',
        ),
        migrations.DeleteModel(
            name='Videos',
        ),
    ]
