# Generated by Django 2.2.27 on 2022-02-07 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20220203_0814'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='stripe_customer_id',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
