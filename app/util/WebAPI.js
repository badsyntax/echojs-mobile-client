'use strict';

import _ from 'lodash';
import request from 'superagent';
import AppActions from '../actions/AppActions';

import {
  POSTS_REQUEST_GET_COMPLETE,
  POSTS_REQUEST_GET_SUCCESS,
  POSTS_REQUEST_GET_ERROR,
  SINGLE_POST_REQUEST_GET_COMPLETE,
  SINGLE_POST_REQUEST_GET_SUCCESS,
  SINGLE_POST_REQUEST_GET_ERROR
} from '../constants/AppConstants';

let endpoint = 'http://localhost:9000';

let exampleNews = require('../data/example-news.json');
let exampleComments = require('../data/example-comments.json');

class API {

  getNews(opts) {

    return new Promise((resolve, reject) => {

      if (process.env.NODE_ENV !== 'production') {
        console.info('Serving mocked data for WebAPI.getNews()');
        return setTimeout(resolve.bind(null, exampleNews.news), 600);
      }

      opts = _.merge({
        sort: 'latest',
        start: 0,
        count: 30
      }, opts);

      let url = [endpoint, 'list'].concat(_.values(opts)).join('/');

      request
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) { return reject(err); }
        resolve(res.body.news);
      });
    });
  }

  getPost(postId) {

    return new Promise((resolve, reject) => {

      if (process.env.NODE_ENV !== 'production') {
        console.info('Serving mocked data for WebAPI.getPost()');
        return setTimeout(resolve.bind(null, {
          post: {},
          comments: exampleComments
        }), 600);
      }

      let url = [endpoint, 'comments', postId].join('/');

      request
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) { return reject(err); }
        resolve({
          post: {},
          comments: res.body
        });
      });
    });
  }
}

export default new API();
