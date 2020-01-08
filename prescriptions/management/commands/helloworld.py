# In production we would set this up with a queuing system such as RabbitMQ to schedule sms and emails to be sent at the right time
# As this is complex and outside our abilities for this project, we will just trigger the sends manually

from django.core.management.base import BaseCommand
from django.utils import timezone

class Command(BaseCommand):
    help = 'Displays current time'

    def handle(self, *args, **kwargs):
        time = timezone.now().strftime('%X')
        self.stdout.write("It's now %s" % time)