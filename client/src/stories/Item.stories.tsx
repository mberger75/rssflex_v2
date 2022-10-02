import Item from '../components/Item';

import '../globals.css';

export default {
  title: 'Components/Item',
  component: Item,
  parameters: {
    layout: 'fullscreen',
  },
};

const MockFeeds = {
  example: {
    title: 'Hello World!',
    categories: ['Web', 'Tech'],
    link: '/',
    pubDate: new Date(),
    content: 'Lorem ipsum',
  },
  EmptyCategories: {
    title: 'Hello World!',
    categories: [],
    link: '/',
    pubDate: new Date(),
    content: 'Lorem ipsum',
  },
  wrongDate: {
    title: 'Hello World!',
    categories: ['Web', 'Tech'],
    link: '/',
    pubDate: 'some string',
    content: 'Lorem ipsum',
  },
  contentEmpty: {
    title: 'Hello World!',
    categories: ['Web', 'Tech'],
    link: '/',
    pubDate: new Date(),
    content: null,
  },
};

export const Example = {
  args: {
    feedItem: MockFeeds.example,
  },
};

export const EmptyCategories = {
  args: {
    feedItem: MockFeeds.EmptyCategories,
  },
};

export const WrongDate = {
  args: {
    feedItem: MockFeeds.wrongDate,
  },
};

export const ContentEmpty = {
  args: {
    feedItem: MockFeeds.contentEmpty,
  },
};
