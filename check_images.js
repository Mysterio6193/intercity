const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('Servd Intercity.html', 'utf-8');
const match = html.match(/const IMG_BY_KIND = \{([\s\S]*?)\};/);
if (!match) { console.log("Not found"); process.exit(1); }

const dictStr = "{" + match[1].replace(/\/\/.*/g, '').trim() + "}";
// Dirty evaluation since it's just keys and string values
const ids = new Set();
const regex = /"photo-[a-zA-Z0-9_-]+"/g;
let m;
while ((m = regex.exec(dictStr)) !== null) {
  ids.add(m[0].replace(/"/g, ''));
}

async function check(id) {
  return new Promise((resolve) => {
    https.get(`https://images.unsplash.com/${id}?w=10`, (res) => {
      resolve({ id, status: res.statusCode });
    }).on('error', () => resolve({ id, status: 0 }));
  });
}

(async () => {
  const promises = Array.from(ids).map(check);
  const results = await Promise.all(promises);
  let failed = results.filter(r => r.status !== 200 && r.status !== 302);
  console.log("Total unique IDs:", ids.size);
  console.log("Failed IDs:", failed);
})();
