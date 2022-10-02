import { useState } from 'react';

import { IFeedItem, IPropsFeedItem } from '../../types';

import './Item.css';

function parseDate(pubDate: string): string {
  if (String(new Date(pubDate)) === 'Invalid Date') {
    return 'Cannot find date';
  }

  return new Date(pubDate).toLocaleString();
}

function parseCategory(cat: string[]): string {
  if (!cat || cat === null || typeof cat[0] !== 'string') {
    return 'Category not found';
  }

  return cat[0];
}

function parseContent(content: string): string {
  if (content === null || content === '') {
    return 'Cannot find content';
  }

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

function Item({ feedItem }: IPropsFeedItem) {
  const [itemSeen, setItemSeen] = useState<boolean>(false);
  const { title, categories, link, pubDate, content }: IFeedItem = feedItem;

  const category: string = parseCategory(categories);

  const seenClass: string = itemSeen ? 'article-seen' : '';

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
