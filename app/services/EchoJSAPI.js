'use strict';

import _ from 'lodash';
import request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  LISTINGS_REQUEST_GET_START,
  LISTINGS_REQUEST_GET_COMPLETE,
  LISTINGS_REQUEST_GET_SUCCESS,
  LISTINGS_REQUEST_GET_ERROR
} from '../constants/AppConstants';

var endpoint = 'http://localhost:9000';

export default {

  getListings(opts) {

    opts = _.merge({
      sort: 'latest',
      start: 0,
      count: 30
    }, opts);

    var url = [endpoint, 'list'].concat(_.values(opts)).join('/');

    AppDispatcher.dispatch({
      actionType: LISTINGS_REQUEST_GET_START
    });

    request
    .get(url)
    .set('Accept', 'application/json')
    .end(this.onGetListings);
  },

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
}
