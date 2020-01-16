# from django.core.management.base import BaseCommand
# import requests
# from django.conf import settings


# THIS SENDS AN SMS - NOT FOR BUILD

# class Command(BaseCommand):
#     help = 'Sends user a reminder sms'

#     def handle(self, *args, **kwargs):

#         resp = requests.get('http://localhost:4000/api/reminders/notifications')
#         resp = resp.json()
#         activereminders = list(filter(lambda ele: ele['active'], resp))

#         sms_list = list(map(lambda ele: {'name': ele['user']['username'], 'mobile': '+44' + ele['user']['mobile'], 'medicine': ele['prescription']['medicine']['name'], 'reminder_type': ele['reminder_type']},  activereminders))

#         print(sms_list)

#         for i in sms_list:
#             mobile = i['mobile']
#             medicine = i['medicine']
#             user = i['name']
#             reminder_type = i['reminder_type']

#             message_to_broadcast = (f'Hi {user}. It\'s time to {reminder_type}: {medicine}')
#             client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
#             client.messages.create(to=mobile,
#                 from_=settings.TWILIO_NUMBER,
#                 body=message_to_broadcast)
