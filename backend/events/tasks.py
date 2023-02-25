from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string


@shared_task()
def send_event(**kwargs):
    video_links = []
    for video in kwargs["event_video"]:
        video_links.append(video['video'])
    image_links = []
    for image in kwargs["event_images"]:
        image_links.append(image['image'])
    context = {
        'dedicate_to_name': kwargs["dedicate_to_name"],
        'event_text': kwargs["event_text"][0]["text"],
        'video_links': video_links,
        'image_links': image_links,
        'sender_name': kwargs["sender_name"]
    }
    email_html_message = render_to_string("email_body.html", context)
    email = EmailMultiAlternatives(
            subject=f'Message from {kwargs["sender_name"]} | {kwargs["type"]}',
            from_email=settings.EMAIL_HOST_USER,
            to=[kwargs['dedicate_to_email']],
            body="",
    )
    email.attach_alternative(email_html_message, "text/html")
    email.send(fail_silently=True)
    return {'status': 'sent successfully'}
