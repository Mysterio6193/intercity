import os

replacements = {
    "photo-1604908176997-431638509a23": "photo-1601050690597-df0568f70950",
    "photo-1626776877478-3b1a04dc4920": "photo-1601050690597-df0568f70950",
    "photo-1626202373052-9cb6c4ec8bbb": "photo-1488477181946-6428a0291777",
    "photo-1604264849572-9f1c9c43e44a": "photo-1556679343-c7306c1976bc",
    "photo-1605197788044-5d96d7d3dbcc": "photo-1567206563064-6f60f40a2b57",
    "photo-1610057099443-fde6c0d0fd14": "photo-1599487488170-d11ec9c172f0",
    "photo-1527477396000-e27163b11b80": "photo-1599487488170-d11ec9c172f0",
    "photo-1603894584373-5ac82b2ae328": "photo-1565557623262-b51c2513a641"
}

files_to_fix = [
    "Servd Intercity.html",
    "Servd Hybrid.html",
    "Servd Pin Grid v2.html",
    "Servd Pin Grid.html"
]

for filename in files_to_fix:
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            content = f.read()
        for old, new in replacements.items():
            content = content.replace(old, new)
        with open(filename, 'w') as f:
            f.write(content)
        print(f"Fixed {filename}")
