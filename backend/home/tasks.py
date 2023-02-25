from django.core.management import call_command
from celery import shared_task


@shared_task(bind=True)
def run_shell_command(self):
    call_command("djstripe_sync_plans_from_stripe")
    result = 'success'
    return result
