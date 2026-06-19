const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  const html = await fetchHtml('https://unsplash.com/s/photos/paneer-tikka');
  const match = html.match(/"id":"([a-zA-Z0-9_-]{11})"/);
  console.log("Found ID:", match ? match[1] : null);
})();
