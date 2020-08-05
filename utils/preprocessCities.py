import json
from typing import Dict

with open("../data/city.list.json", 'r') as f:
    data = json.load(f)

cleanCities = []

for city in data:
    cleanCity = {'title': f'{city["name"]}, {city["state"] + ", " + city["country"] if city["state"] else city["country"]}'}
    cleanCities.append(cleanCity)


def searchKey(city: Dict[str, str]):
    return city["title"].lower().replace(" ", "")
cleanCities.sort(key=searchKey)


with open("../data/city.list.clean.json", 'w') as f:
    data = json.dump(cleanCities, f)
