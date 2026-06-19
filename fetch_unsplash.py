import re
import time
from duckduckgo_search import DDGS

dishes = [
    "paratha", "cutlet", "french fries", "paneer pakora", "pakora", "roasted chana", 
    "sandwich", "club sandwich", "toast", "tomato soup", "cream soup", "clear soup",
    "noodle soup", "corn soup", "paneer tikka", "mushroom tikka", "seekh kebab",
    "hara kebab", "tandoor platter", "tandoori aloo", "tandoori phool", "green salad",
    "kachumber salad", "chaat", "russian salad", "greek salad", "papad",
    "paneer butter masala", "kadai paneer", "palak paneer", "mutter paneer",
    "paneer tikka masala", "paneer curry", "paneer lababdar", "dry paneer",
    "dum aloo", "aloo gobi", "mushroom mutter", "malai kofta", "mixed veg",
    "baby corn", "veg curry", "bhindi", "stuffed tomato", "channa masala",
    "egg curry", "veg makhani", "dal fry", "dal makhani", "dal bukhara",
    "dal palak", "plain rice", "jeera rice", "khichdi", "biryani", "roti",
    "missi roti", "naan", "butter naan", "stuffed paratha", "lachha paratha",
    "chilli naan", "raita", "fruit raita", "boondi raita", "curd", "manchurian",
    "hakka noodles", "schezwan noodles", "chilli paneer", "stuffed mushroom",
    "pepper paneer", "masala tea", "coffee cup", "pot tea", "pot coffee",
    "lemon tea", "hot milk", "soft drink", "lime soda", "lime water", "buttermilk",
    "lassi", "water bottle", "iced tea", "blue mocktail", "mint mojito",
    "strawberry mojito", "strawberry shake", "mango shake", "pineapple shake",
    "badam shake", "chocolate shake", "cold coffee", "ice cream", "gulab jamun",
    "jamun icecream", "rasgulla", "chicken tikka", "malai chicken", "tandoori chicken",
    "chicken seekh", "chicken wings", "fish tikka", "fish finger", "mutton seekh",
    "tandoor platter nv", "butter chicken", "chicken tikka masala", "kadai chicken",
    "chicken korma", "mutton rogan josh", "mutton curry", "keema", "fish curry",
    "poha", "idli", "dosa", "omelette", "chicken biryani", "mutton biryani",
    "egg biryani", "chicken manchurian", "chilli chicken", "chicken fried rice",
    "egg fried rice", "veg fried rice", "garlic naan", "mutton shorba", "kheer"
]

results = {}
ddgs = DDGS()

for dish in dishes:
    try:
        # Search web for unsplash link
        search_res = list(ddgs.text(f"site:unsplash.com {dish} food", max_results=5))
        found = False
        for r in search_res:
            url = r.get('href', '')
            match = re.search(r'unsplash\.com/photos/.*?([a-zA-Z0-9_-]{11})', url)
            if not match:
                match = re.search(r'images\.unsplash\.com/photo-([a-zA-Z0-9_-]+)', url)
            if match:
                results[dish] = match.group(1)
                found = True
                break
        if not found:
            results[dish] = None
    except Exception as e:
        results[dish] = None
    time.sleep(1.5)

import json
with open('unsplash_mappings.json', 'w') as f:
    json.dump(results, f, indent=2)

print("Done generating mappings!")
