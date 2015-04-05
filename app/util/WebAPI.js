'use strict';

import 'whatwg-fetch';
import _ from 'lodash';
import AppActions from '../actions/AppActions';

import {
  API_ENDPOINT
} from '../constants/AppConstants';

let cache = {};

function cacheResponse(fetchPromise, options) {
  if (options.id in cache && Date.now() - options.age <= cache[options.id].time) {
    return cache[options.id].promise;
  }
  cache[options.id] = {
    time: Date.now(),
    promise: fetchPromise
  };
  return fetchPromise;
}

function getURL(parts) {
  return [ API_ENDPOINT ].concat(parts).join('/');
}

class API {

  getNews(opts) {

    let url = getURL(_.values(_.merge({
      action: 'list',
      sort: 'latest',
      start: 0,
      count: 30
    }, opts)));

    let request = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.news;
    })

    return cacheResponse(request, {
      id: url,
      age: 60 * 1000 // 60 seconds
    });
  }

  getPost(postId) {

    let url = getURL(_.values({
      action: 'comments',
      postId: postId
    }));

    let request = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((comments) => {
      return {
        post: null,
        comments: comments
      };
    });

    return cacheResponse(request, {
      id: url,
      age: 60 * 1000 // 60 seconds
    });
  }
}

export default new API();
