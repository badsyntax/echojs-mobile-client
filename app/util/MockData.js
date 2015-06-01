'use strict';

import { DEBUG } from '../constants/AppConstants';


import newsData from '../data/example-news.json';
import commentsData from '../data/example-comments.json';

let d = {
  news: newsData,
  comments: commentsData
};

export default {
  getData(key) {
    return new Promise((resolve) => {
      resolve(d[key]);
    });
  }
};
