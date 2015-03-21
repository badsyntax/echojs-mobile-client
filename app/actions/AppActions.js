'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ListingStore from '../stores/ListingStore';
import CommentsStore from '../stores/CommentsStore';
import WebAPI from '../util/WebAPI';

import {
  ACTION_LISTINGS_GET,
  ACTION_LISTINGS_GET_ERROR,
  ACTION_LISTINGS_GET_SUCCESS,
  ACTION_COMMENTS_GET,
  ACTION_COMMENTS_GET_ERROR,
  ACTION_COMMENTS_GET_SUCCESS
} from '../constants/AppConstants';

export default {

  getListings() {

    AppDispatcher.dispatch({
      actionType: ACTION_LISTINGS_GET
    });

    WebAPI.getNews()
    .then((items) => {
      AppDispatcher.dispatch({
        actionType: ACTION_LISTINGS_GET_SUCCESS,
        listings: items
      });
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: ACTION_LISTINGS_GET_ERROR
      });
    });
  },

  getComments(newsId) {

    AppDispatcher.dispatch({
      actionType: ACTION_COMMENTS_GET
    });

    WebAPI.getComments(newsId)
    .then((items) => {
      AppDispatcher.dispatch({
        actionType: ACTION_COMMENTS_GET_SUCCESS,
        items: items
      });
    })
    .catch(() => {
      // alert('error');
      AppDispatcher.dispatch({
        actionType: ACTION_COMMENTS_GET_ERROR
      });
    });
  }

}

