'use strict';

import 'whatwg-fetch';
import _ from 'lodash';
import AppActions from '../actions/AppActions';

import {
  API_ENDPOINT
} from '../constants/AppConstants';

let cache = {};

function fetchJson(url) {
  return fetch(url).then((response) => {
    return response.json();
  })
}

function cachedJsonFetch(url, options) {
  if (url in cache && Date.now() - options.age <= cache[url].time) {
    return cache[url].promise;
  }
  let fetchPromise = fetchJson(url);
  cache[url] = {
    time: Date.now(),
    promise: fetchPromise
  };
  return fetchPromise;
}

function getURL(parts) {
  return [ API_ENDPOINT ].concat(parts).join('/');
}

class API {

  resetCache() {
    cache = {};
  }

  getNews(opts) {

    let url = getURL(_.values(_.merge({
      action: 'list',
      sort: 'latest',
      start: 0,
      count: 30
    }, opts)));

    return cachedJsonFetch(url, {
      age: 60 * 1000 // 60 seconds
    })
    .then((json) => {
      return json.news;
    });
  }

  getPost(postId) {

    let url = getURL(_.values({
      action: 'comments',
      postId: postId
    }));

    return fetchJson(url)
    .then((comments) => {
      return {
        post: null,
        comments: comments
      };
    })
  }
}

export default new API();
