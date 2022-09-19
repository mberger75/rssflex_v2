import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import FeedAccordion from './components/FeedAccordion';

function App() {
  const [feedCategory, setFeedCategory] = useState('dev');
  const [feedNames, setFeedNames] = useState([]);

  async function fetchFeedNames(feedCategory) {
    setFeedNames([]);
    const res = await fetch(`https://rssflex.qweit.com/api/feednames/${feedCategory}`);
    const json = await res.json();
    setFeedNames(json);
  }

  useEffect(() => {
    fetchFeedNames(feedCategory);
  }, [feedCategory]);

  return (
    <div className='App'>
      <Navbar setFeedCategory={setFeedCategory} />
      {feedNames.length <= 0 ? (
        <h1 className='loader'>Loading {feedCategory} feeds...</h1>
      ) : (
        feedNames.map((feedName, idx) => (
          <FeedAccordion key={idx} feedCategory={feedCategory} feedName={feedName} />
        ))
      )}
    </div>
  );
}

export default App;
