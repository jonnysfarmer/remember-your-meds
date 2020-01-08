import requests

resp = requests.get('http://127.0.0.1:4000/api/reminders')
resp = resp.json()
activereminders = list(filter(lambda ele: ele["active"], resp))
print(activereminders)
