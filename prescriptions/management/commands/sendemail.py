from django.core.management.base import BaseCommand
import yagmail

class Command(BaseCommand):
    help = 'Sends user a reminder email'

    sender_email = 'remember.your.meds.project@gmail.com'
    receiver_email = 'jennikate@gmail.com'
    subject = "Check cronjobs out"

    # try: 
    yag = yagmail.SMTP(user=sender_email)

    contents = [
    "This is A NEW TEST again",
    "As you can see, we can send a list of strings,",
    "being this our third one",
    ]

    yag.send(receiver_email, subject, contents)

    # except Exception as e:
    # print(f'Something went wrong!e{e}')
