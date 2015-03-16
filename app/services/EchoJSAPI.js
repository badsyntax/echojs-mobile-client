'use strict';

import _ from 'lodash';
import request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  LISTINGS_REQUEST_GET,
  LISTINGS_REQUEST_GET_COMPLETE,
  LISTINGS_REQUEST_GET_SUCCESS,
  LISTINGS_REQUEST_GET_ERROR
} from '../constants/AppConstants';

var endpoint = 'http://localhost:9000';

class API {

  getListings(opts) {

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

var api = new API();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case LISTINGS_REQUEST_GET:
      api.getListings();
      break;
    default:
  }
});

export default api;
