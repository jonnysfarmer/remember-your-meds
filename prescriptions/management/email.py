
import yagmail
import requests

resp = requests.get('http://localhost:4000/api/reminders')
resp = resp.json()
activereminders = list(filter(lambda ele: ele['active'], resp))

email_list = list(map(lambda ele: ele['user']['email'], activereminders))

# email_list = list(map(lambda ele: {name: ele['user']['username'], email: ele['user']['email'], medicine: ele['presription']['medicine']['name']},  activereminders))

# print(email_list)

for x in email_list:
    print(x)


# sender_email = 'remember.your.meds.project@gmail.com'
# receiver_email = 'jennikate@gmail.com'
# subject = "Check cronjobs out"

# try: 
#     yag = yagmail.SMTP(user=sender_email)

#     contents = [
#     "This is A NEW TEST again",
#     "As you can see, we can send a list of strings,",
#     "being this our third one",
#     ]

#     yag.send(receiver_email, subject, contents)

# except Exception as e:
#     self.stdout.write(f'There was an error!e{e}')
