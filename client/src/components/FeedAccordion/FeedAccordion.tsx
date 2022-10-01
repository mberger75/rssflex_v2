import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

import Item from '../Item';

import './FeedAccordion.css';

type IFeedAccordion = {
  feedCategory: String;
  feedName: String;
};

function FeedAccordion({ feedCategory, feedName }: IFeedAccordion) {
  const [feed, setFeed] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isAlreadyFetched, setIsAlreadyFetched] = useState([]);

  async function fetchFeed(feedCategory, feedName) {
    const res = await fetch(`https://rssflex.qweit.com/api/${feedCategory}/${feedName}`);
    const json = await res.json();
    setFeed(json);
  }

  function handleChange(panel) {
    setExpanded(!expanded);

    if (isAlreadyFetched.includes(panel)) return;

    fetchFeed(feedCategory, panel);

    setIsAlreadyFetched([...isAlreadyFetched, panel]);
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
            feed.items.map((feedItem, idx) => <Item key={idx} feedItem={feedItem} />)
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FeedAccordion;