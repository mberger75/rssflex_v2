import './Item.css';

function itemSeen(e) {
  const seenClass = 'article-seen';

  if (!e.currentTarget.classList.contains(seenClass)) {
    return e.currentTarget.classList.add(seenClass);
  }
}

function parseDate(pubDate) {
  if (String(new Date(pubDate)) !== 'Invalid Date') {
    return 'Le ' + new Date(pubDate).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
  } else {
    return false;
  }
}

function parseCategory(cat) {
  return cat && typeof cat[0] === 'string' && cat[0];
}

function parseContent(content) {
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

function Item({ feedItem }) {
  const { title, categories, link, pubDate, content } = feedItem;
  const category = parseCategory(categories);

  return (
    <article key={link} className='article' onClick={(e) => itemSeen(e)}>
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
