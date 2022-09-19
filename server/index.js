import express from 'express';
import cors from 'cors';
import Parser from 'rss-parser';

import { feeds } from './data.js';

const app = express();
const port = process.env.port || 5000;
const parser = new Parser();
const corsOptions = {
  origin: 'http://127.0.0.1:5173',
};

app.use(cors(corsOptions));

function parseFeed(feedUrl, limit) {
  const rssIcon =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/640px-Feed-icon.svg.png';

  return new Promise(async (res) => {
    let feed = {};

    const parsedFeed = await parser.parseURL(feedUrl);

    if (parsedFeed.items) {
      const feedItems = parsedFeed.items.slice(0, limit);

      feed = {
        link: parsedFeed.link.replace(/.+\/\/|www.|\..+/g, ''),
        image: parsedFeed.image ? parsedFeed.image.url : rssIcon,
        items: feedItems,
      };
    }

    res(feed);
  });
}

app.get('/api/feedcategories', (req, res) => {
  let feedCategories = [];

  for (const feedCategory in feeds) {
    feedCategories.push(feedCategory);
  }

  res.json(feedCategories);
});

app.get('/api/feednames/:category', (req, res) => {
  let feedNames = [];

  for (const feedName in feeds[req.params.category].feedLinks) {
    feedNames.push(feedName);
  }

  res.json(feedNames);
});

// http://localhost:5000/api/dev/5
app.get('/api/:category/:feedname/:limit?', async (req, res) => {
  const { category, feedname } = req.params;

  const limit = req.params.limit || 10;

  const feedUrl = feeds[category].feedLinks[feedname];

  const mergedFeeds = await parseFeed(feedUrl, limit);

  res.json(mergedFeeds);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
