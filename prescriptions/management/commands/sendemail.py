from django.core.management.base import BaseCommand
import yagmail
import requests

class Command(BaseCommand):
    help = 'Sends user a reminder email'

    def handle(self, *args, **kwargs):

        resp = requests.get('http://localhost:4000/api/reminders')
        resp = resp.json()
        activereminders = list(filter(lambda ele: ele['active'], resp))

        email_list = list(map(lambda ele: {'name': ele['user']['username'], 'email': ele['user']['email'], 'medicine': ele['prescription']['medicine']['name'], 'reminder_type': ele['reminder_type']},  activereminders))

        print(email_list)

        for i in email_list:
            email = i['email']
            medicine = i['medicine']
            user = i['name']
            reminder_type = i['reminder_type']
            
            sender_email = 'remember.your.meds.project@gmail.com'
            receiver_email = email
            subject = (f'REMINDER! {reminder_type} {medicine}')

            try:
                yag = yagmail.SMTP(user=sender_email)

                contents = [
                f"Hi {user}",
                f"It's time to {reminder_type} your {medicine}",
                "Cheers",
                ]

                yag.send(receiver_email, subject, contents)

            except Exception as e:
                self.stdout.write(f'There was an error!e{e}')
