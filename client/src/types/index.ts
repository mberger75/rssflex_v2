export type FeedItem = {
  title: string;
  categories: string[];
  link: string;
  pubDate: string;
  content: string;
};

export type FeedItemProps = {
  feedItem: FeedItem;
};

export type FeedAccordionProps = {
  feedCategory: string;
  feedName: string;
};

export type Feed = {
  items: FeedItem[];
};
