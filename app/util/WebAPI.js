'use strict';

import 'whatwg-fetch';
import _ from 'lodash';
import AppActions from '../actions/AppActions';

import MockData from './MockData';

import {
  DEBUG_MOCK_DATA,
  API_ENDPOINT,
  NEWS_CACHE_AGE
} from '../constants/AppConstants';

if (DEBUG_MOCK_DATA) {
  console.info('Using mock data')
}

let cache = {};

function fetchJson(url) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

function cacheFetchJson(url, options) {
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

    let promise = DEBUG_MOCK_DATA ? MockData.getData('news') : cacheFetchJson(url, {
      age: NEWS_CACHE_AGE
    });

    return promise.then((json) => {
      return json.news;
    });
  }

  getPost(postId) {

    let url = getURL(_.values({
      action: 'comments',
      postId: postId
    }));

    let promise = DEBUG_MOCK_DATA ? MockData.getData('post') : fetchJson(url);

    return promise.then((comments) => {
      return {
        post: null,
        comments: comments
      };
    });
  }
}

export default new API();
