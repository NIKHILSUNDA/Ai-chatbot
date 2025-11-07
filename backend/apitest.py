import requests

url = "http://localhost:5000/api/chat"
payload = {"query": "What is the admission process?"}
response = requests.post(url, json=payload)
print("Status code:", response.status_code)
print("Response:", response.text)
