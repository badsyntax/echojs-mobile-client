'use strict';

import _ from 'lodash';
import request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  LISTINGS_REQUEST_GET_COMPLETE,
  LISTINGS_REQUEST_GET_SUCCESS,
  LISTINGS_REQUEST_GET_ERROR,
  COMMENTS_REQUEST_GET_COMPLETE,
  COMMENTS_REQUEST_GET_SUCCESS,
  COMMENTS_REQUEST_GET_ERROR
} from '../constants/AppConstants';

var endpoint = 'http://localhost:9000';

var exampleNews = require('../data/example-news.json');

class API {

  getListings(opts) {

    if (process.env.NODE_ENV !== 'production') {
      console.info('Serving mocked data');
      return setTimeout(this.onGetListings.bind(this, null, { body: exampleNews }), 600);
    }

    opts = _.merge({
      sort: 'latest',
      start: 0,
      count: 30
    }, opts);

    var url = [endpoint, 'list'].concat(_.values(opts)).join('/');

    request
    .get(url)
    .set('Accept', 'application/json')
    .end(this.onGetListings);
  }

  getComments(newsId) {
    var url = [endpoint, 'comments', newsId].join('/');

    request
    .get(url)
    .set('Accept', 'application/json')
    .end(this.onGetComments);
  }

  onGetListings(err, res) {
    AppDispatcher.dispatch({
      actionType: LISTINGS_REQUEST_GET_COMPLETE
    });
    if (err) {
      AppDispatcher.dispatch({
        actionType: LISTINGS_REQUEST_GET_ERROR
      });
    } else {
      AppDispatcher.dispatch({
        actionType: LISTINGS_REQUEST_GET_SUCCESS,
        listings: res.body.news
      });
    }
  }

  onGetComments(err, res) {
    AppDispatcher.dispatch({
      actionType: COMMENTS_REQUEST_GET_COMPLETE
    });
    if (err) {
      AppDispatcher.dispatch({
        actionType: COMMENTS_REQUEST_GET_ERROR
      });
    } else {
      AppDispatcher.dispatch({
        actionType: COMMENTS_REQUEST_GET_SUCCESS,
        comments: res.body
      });
    }
  }
}

var api = new API();

export default api;
