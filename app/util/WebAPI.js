'use strict';

import _ from 'lodash';
import request from 'superagent';
import AppActions from '../actions/AppActions';

import {
  LISTINGS_REQUEST_GET_COMPLETE,
  LISTINGS_REQUEST_GET_SUCCESS,
  LISTINGS_REQUEST_GET_ERROR,
  COMMENTS_REQUEST_GET_COMPLETE,
  COMMENTS_REQUEST_GET_SUCCESS,
  COMMENTS_REQUEST_GET_ERROR
} from '../constants/AppConstants';

let endpoint = 'http://localhost:9000';

let exampleNews = require('../data/example-news.json');

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

  getComments(newsId) {

    return new Promise((resolve, reject) => {

      let url = [endpoint, 'comments', newsId].join('/');

      request
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) { return reject(err); }
        resolve(res.body.news);
      });
    });
  }
}

export default new API();
