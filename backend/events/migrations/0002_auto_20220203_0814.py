# Generated by Django 2.2.27 on 2022-02-03 08:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=500)),
                ('image', models.ImageField(upload_to='category/')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('dedicate_to_name', models.CharField(max_length=100)),
                ('dedicate_to_email', models.EmailField(max_length=254)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('collaborator_email', models.EmailField(max_length=254)),
                ('journal_part', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=100)),
                ('main_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.Category')),
            ],
        ),
        migrations.AlterField(
            model_name='addmoretext',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='text', to='events.Event'),
        ),
        migrations.AlterField(
            model_name='images',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_images', to='events.Event'),
        ),
        migrations.AlterField(
            model_name='videos',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_videos', to='events.Event'),
        ),
        migrations.DeleteModel(
            name='Celebrations',
        ),
        migrations.AddField(
            model_name='event',
            name='event_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='event_sub_cat', to='events.SubCategory'),
        ),
        migrations.AddField(
            model_name='event',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
