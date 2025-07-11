const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/browse', async (req, res) => {
  const { url, ua } = req.query;
  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': decodeURIComponent(ua)
      }
    });
    const html = await response.text();
    res.send(html);
  } catch (err) {
    res.status(500).send("Failed to fetch: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
