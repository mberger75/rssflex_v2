import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

import Item from '../Item';
import { IFeedItem, IFeed, IFeedAccordion } from '../../types';

import './FeedAccordion.css';

function FeedAccordion({ feedCategory, feedName }: IFeedAccordion) {
  const [feed, setFeed] = useState<IFeed | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isAlreadyFetched, setIsAlreadyFetched] = useState<string[]>([]);

  async function fetchFeed(feedCategory: string, feedName: string) {
    const res = await fetch(`https://rssflex.qweit.com/api/${feedCategory}/${feedName}`);
    const json = await res.json();
    setFeed(json);
  }

  function handleChange(feedName: string): void {
    setExpanded(!expanded);

    if (isAlreadyFetched.includes(feedName)) return;

    fetchFeed(feedCategory, feedName);

    setIsAlreadyFetched([...isAlreadyFetched, feedName]);
  }

  return (
    <div className='accordion'>
      <Accordion
        expanded={expanded}
        onChange={() => handleChange(feedName)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: '50%', flexShrink: 0 }}>{feedName.toUpperCase()}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {feed === null ? (
            <CircularProgress />
          ) : (
            feed.items.map((feedItem: IFeedItem, idx: number) => (
              <Item key={idx} feedItem={feedItem} />
            ))
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FeedAccordion;
