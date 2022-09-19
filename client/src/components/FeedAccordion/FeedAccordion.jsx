import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

import Item from '../Item';

import './FeedAccordion.css';

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
    <div className='accordion'>
      <Accordion
        expanded={expanded === feedName}
        onChange={handleChange(feedName)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={feedName} id={feedName}>
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
