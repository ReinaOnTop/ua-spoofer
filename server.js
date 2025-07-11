const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.get('/browse', async (req, res) => {
  const { url, ua, ip } = req.query;
  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': decodeURIComponent(ua),
        'X-Forwarded-For': decodeURIComponent(ip)
      }
    });
    const html = await response.text();
    res.send(html);
  } catch (err) {
    res.status(500).send("Failed to fetch: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
