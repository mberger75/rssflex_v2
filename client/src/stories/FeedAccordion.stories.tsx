import FeedAccordion from '../components/FeedAccordion';

export default {
  title: 'Components/FeedAccordion',
  component: FeedAccordion,
  parameters: {
    layout: 'fullscreen',
  },
};

const MockAccordion = {
  example: {
    feedCategory: 'dev',
    feedName: 'codeur',
  },
};

export const Example = {
  args: {
    feedCategory: MockAccordion.example.feedCategory,
    feedName: MockAccordion.example.feedName,
  },
};
