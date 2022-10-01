import { useState } from 'react';

import './Item.css';

function parseDate(pubDate: string): string {
  if (String(new Date(pubDate)) !== 'Invalid Date') {
    return 'Le ' + new Date(pubDate).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
  }
}

function parseCategory(cat: string): string {
  return cat && typeof cat[0] === 'string' && cat[0];
}

function parseContent(content: string): string {
  return content
    .substring(0, 300)
    .replace(/&#8217;|&#39;/g, `'`)
    .replace(/&#8230;/g, '...')
    .replace(/&eacute;|&egrave;|&ecirc;|&euml;/g, 'e')
    .replace(/&agrave;|&acirc;/g, 'a')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&#32;|&nbsp;/g, ' ')
    .replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '');
}

type IFeedItem = {
  title: string;
  categories: string;
  link: string;
  pubDate: string;
  content: string;
};

type IPropsFeedItem = {
  feedItem: IFeedItem;
};

function Item({ feedItem }: IPropsFeedItem) {
  const [itemSeen, setItemSeen] = useState(false);
  const { title, categories, link, pubDate, content } = feedItem;
  const category = parseCategory(categories);

  const seenClass = itemSeen ? 'article-seen' : '';

  return (
    <article key={link} className={`article ${seenClass}`} onClick={() => setItemSeen(!itemSeen)}>
      <div className='content'>
        <a
          className='content-main'
          href={link}
          title={link}
          target='_blank'
          rel='noopener noreferrer'
        >
          <p className='title'>{title}</p>
          {category && <p className='categorie'>{category}</p>}
          {pubDate && <p className='date'>{parseDate(pubDate)}</p>}
          <p className='description'>{parseContent(content)}...</p>
          <hr />
        </a>
      </div>
    </article>
  );
}

export default Item;
