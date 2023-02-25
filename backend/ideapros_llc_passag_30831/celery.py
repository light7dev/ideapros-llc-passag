import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ideapros_llc_passag_30831.settings')
app = Celery('ideapros_llc_passag_30831')
app.config_from_object(settings, namespace='CELERY')
app.autodiscover_tasks()
