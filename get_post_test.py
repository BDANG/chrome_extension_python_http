import requests

link = "http://localhost:8000"

response = requests.get(link)
print(response.text)


response = requests.post(link, data={"hello": "okay"})
print(response.text)