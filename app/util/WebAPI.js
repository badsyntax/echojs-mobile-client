'use strict';

import 'whatwg-fetch';
import _ from 'lodash';
import AppActions from '../actions/AppActions';

import {
  API_ENDPOINT,
} from '../constants/AppConstants';


class API {

  getURL(parts) {
    return [ API_ENDPOINT ].concat(parts).join('/');
  }

  getNews(opts) {

    let url = this.getURL(_.values(_.merge({
      action: 'list',
      sort: 'latest',
      start: 0,
      count: 30
    }, opts)));

    return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.news;
    });
  }

  getPost(postId) {

    let url = this.getURL(_.values({
      action: 'comments',
      postId: postId,
    }));

    return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((comments) => {
      return {
        post: null,
        comments: comments
      };
    });
  }
}

export default new API();
