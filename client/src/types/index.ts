export type IFeedItem = {
  title: string;
  categories: string[];
  link: string;
  pubDate: string;
  content: string;
};

export type IPropsFeedItem = {
  feedItem: IFeedItem;
};

export type IFeedAccordion = {
  feedCategory: string;
  feedName: string;
};

export type IFeed = {
  items: IFeedItem[];
};
