# Generated by Django 2.2.27 on 2022-04-21 20:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0010_auto_20220401_1348'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventVideo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(blank=True, null=True, upload_to='events/videos/')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_video', to='events.Event')),
            ],
        ),
        migrations.CreateModel(
            name='EventImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(upload_to='events/images')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_images', to='events.Event')),
            ],
        ),
        migrations.CreateModel(
            name='EventAddMoreText',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=500)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_text', to='events.Event')),
            ],
        ),
    ]
