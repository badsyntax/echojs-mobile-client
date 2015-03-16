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

var endpoint = 'http://localhost:9000';

var exampleNews = require('../data/example-news.json');

class API {

  getNews(opts) {

    AppActions.getListingsStart();

    if (process.env.NODE_ENV !== 'production') {
      console.info('Serving mocked data for WebAPI.getNews()');
      return setTimeout(this._onGetListings.bind(this, null, {
        body: exampleNews
      }), 600);
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
    .end(this._onGetListings);
  }

  getComments(newsId) {

    AppActions.getCommentsStart();

    var url = [endpoint, 'comments', newsId].join('/');

    request
    .get(url)
    .set('Accept', 'application/json')
    .end(this._onGetComments);
  }

  _onGetListings(err, res) {
    AppActions.getListingsComplete();
    if (err) {
      AppActions.getListingsError();
    } else {
      AppActions.getListingsSuccess(res.body.news);
    }
  }

  _onGetComments(err, res) {
    AppActions.getCommentsComplete();
    if (err) {
      AppActions.getCommentsError();
    } else {
      AppActions.getCommentsSuccess(res.body);
    }
  }
}

var api = new API();

export default api;
