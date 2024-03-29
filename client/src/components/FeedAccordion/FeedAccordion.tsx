import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

import { Feed, FeedItem, FeedAccordionProps } from '../../types';

import Item from '../Item';

import './FeedAccordion.css';

function FeedAccordion({ feedCategory, feedName }: FeedAccordionProps) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isAlreadyFetched, setIsAlreadyFetched] = useState<string[]>([]);

  async function fetchFeed(feedCategory: string, feedName: string) {
    const res = await fetch(`http://localhost:5000/api/${feedCategory}/${feedName}`);
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
            feed.items.map((feedItem: FeedItem, idx: number) => (
              <Item key={idx} feedItem={feedItem} />
            ))
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FeedAccordion;
