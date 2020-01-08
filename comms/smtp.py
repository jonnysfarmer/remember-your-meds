import yagmail

sender_email = 'remember.your.meds.project@gmail.com'
receiver_email = 'jennikate@gmail.com'
# receiver_emails = ['jennikate@gmail.com', 'jennikate.wallace@gmail.com'] can do multiple this way but then they're seen in the cc field so don't do this!
subject = "Check THIS out"
# sender_password = input(f'Please, enter the password for {sender_email}:n') #look into saving this in keychain, haven't worked that out yet

try: 
    yag = yagmail.SMTP(user=sender_email)

    contents = [
    "This is A NEW TEST",
    "As you can see, we can send a list of strings,",
    "being this our third one",
    ]

    yag.send(receiver_email, subject, contents)

except Exception as e:
  print(f'Something went wrong!e{e}')
