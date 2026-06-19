import urllib.request
import re
import json

dishes = [
    "paratha", "cutlet", "french fries", "paneer", "pakora", "roasted chana", 
    "sandwich", "toast", "tomato soup", "noodle soup", "corn soup", "tikka", 
    "kebab", "salad", "chaat", "papad", "dal", "rice", "khichdi", "biryani", "roti",
    "naan", "raita", "curd", "manchurian", "noodles", "chilli paneer",
    "masala tea", "coffee", "pot tea", "lemon tea", "hot milk", "soft drink", 
    "lime soda", "lassi", "water bottle", "iced tea", "mojito", "shake",
    "ice cream", "gulab jamun", "rasgulla", "chicken", "fish", "mutton",
    "poha", "idli", "dosa", "omelette", "shorba", "kheer", "thali", "breakfast spread"
]

results = {}
for dish in dishes:
    try:
        req = urllib.request.Request(
            f"https://unsplash.com/s/photos/{dish.replace(' ', '-')}", 
            headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
        )
        html = urllib.request.urlopen(req, timeout=3).read().decode('utf-8')
        match = re.search(r'"id":"([a-zA-Z0-9_-]{11})"', html)
        if match:
            results[dish] = match.group(1)
        else:
            results[dish] = None
    except Exception as e:
        results[dish] = None

with open('fast_mappings.json', 'w') as f:
    json.dump(results, f, indent=2)

print("Fast mappings complete!")
