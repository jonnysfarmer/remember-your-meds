import requests

resp = requests.get('http://127.0.0.1:4000/api/reminders')
resp = resp.json()
activereminders = list(filter(lambda ele: ele["active"], resp))
# print(activereminders)


test = list(map(lambda ele: {'name': ele['user']['username'], 'email': ele['user']['email'], 'medicine': ele['prescription']['medicine']['name']},  activereminders))

for i in test:
    print (i['name'])