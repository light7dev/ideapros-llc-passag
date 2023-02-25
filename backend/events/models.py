from django.db import models
from users.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    image = models.ImageField(upload_to='category/')
    sort = models.PositiveSmallIntegerField(default=1)
    screen_name = models.CharField(max_length=250, default='')

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    main_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.type


class Event(models.Model):
    event_type = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='event_sub_cat', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    dedicate_to_name = models.CharField(max_length=100)
    dedicate_to_email = models.EmailField()
    date = models.DateField()
    time = models.TimeField()
    collaborator_email = models.EmailField()
    journal_part = models.CharField(max_length=250)

    def __str__(self):
        return self.title


class EventImages(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_images")
    image = models.FileField(upload_to="events/images", null=True, blank=True)

    def __str__(self):
        return self.event.event_type.type


class EventVideo(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=False, blank=False,
                              related_name="event_video")
    video = models.FileField(upload_to='events/videos/', null=True, blank=True)

    def __str__(self):
        return self.video.name


class EventAddMoreText(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=False, blank=False,
                              related_name="event_text")
    text = models.TextField(max_length=500)

    def __str__(self):
        return self.text


class Introduction(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField(max_length=500)
    introduction_video = models.FileField(upload_to='intro_video')

    def __str__(self):
        return self.title
