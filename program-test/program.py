import requests

resp = requests.get('http://127.0.0.1:4000/api/medicines/')
print(resp.json())
