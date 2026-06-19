const https = require('https');

function searchUnsplash(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0].id);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', (e) => resolve(null));
  });
}

(async () => {
  const queries = ["biryani", "paneer", "naan bread", "dal makhani", "samosa", "fried rice", "masala dosa", "idli", "french fries", "tomato soup", "kebab", "chicken tikka", "butter chicken", "fish curry"];
  for (const q of queries) {
    const id = await searchUnsplash(q);
    console.log(`"${q}": "${id}",`);
  }
})();
