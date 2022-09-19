import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Item from '../Item';

function FeedAccordion({ feedCategory, feedName }) {
  const [feed, setFeed] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isAlreadyFetched, setIsAlreadyFetched] = useState([]);

  async function fetchFeed(feedCategory, feedName) {
    const res = await fetch(`http://localhost:5000/api/${feedCategory}/${feedName}`);
    const json = await res.json();
    setFeed(json);
  }

  function handleChange(panel) {
    return (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);

      if (isAlreadyFetched.includes(panel)) return;

      fetchFeed(feedCategory, panel);

      setIsAlreadyFetched([...isAlreadyFetched, panel]);
    };
  }

  return (
    <Accordion
      className={`${feedName}-${isAlreadyFetched}`}
      expanded={expanded === feedName}
      onChange={handleChange(feedName)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={feedName} id={feedName}>
        <Typography sx={{ width: '50%', flexShrink: 0 }}>{feedName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {feed === null ? (
          <p>Loading {feedName} rss feed...</p>
        ) : (
          feed.items.map((feedItem, idx) => <Item key={idx} feedItem={feedItem} />)
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default FeedAccordion;
