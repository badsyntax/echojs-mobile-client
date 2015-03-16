'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ListingStore from '../stores/ListingStore';
import CommentsStore from '../stores/CommentsStore';

import {
  ACTION_LISTINGS_GET,
  ACTION_LISTINGS_REQUEST_GET_START,
  ACTION_LISTINGS_REQUEST_GET_COMPLETE,
  ACTION_LISTINGS_REQUEST_GET_ERROR,
  ACTION_LISTINGS_REQUEST_GET_SUCCESS,
  ACTION_COMMENTS_GET,
  ACTION_COMMENTS_REQUEST_GET_START,
  ACTION_COMMENTS_REQUEST_GET_COMPLETE,
  ACTION_COMMENTS_REQUEST_GET_ERROR,
  ACTION_COMMENTS_REQUEST_GET_SUCCESS
} from '../constants/AppConstants';

export default {

  getListings() {
    AppDispatcher.dispatch({
      actionType: ACTION_LISTINGS_GET
    });
  },

  getListingsStart() {
    AppDispatcher.dispatch({
      actionType: ACTION_LISTINGS_REQUEST_GET_START
    });
  },

  getListingsComplete() {
    AppDispatcher.dispatch({
      actionType: ACTION_LISTINGS_REQUEST_GET_COMPLETE
    });
  },

  getListingsError() {
    AppDispatcher.dispatch({
      actionType: ACTION_LISTINGS_REQUEST_GET_ERROR
    });
  },

  getListingsSuccess(listings) {
    AppDispatcher.dispatch({
      actionType: ACTION_LISTINGS_REQUEST_GET_SUCCESS,
      listings: listings
    });
  },

  getComments(newsId) {
    AppDispatcher.dispatch({
      actionType: ACTION_COMMENTS_GET,
      newsId: newsId
    });
  },

  getCommentsStart() {
    AppDispatcher.dispatch({
      actionType: ACTION_COMMENTS_REQUEST_GET_START
    });
  },

  getCommentsComplete() {
    AppDispatcher.dispatch({
      actionType: ACTION_COMMENTS_REQUEST_GET_COMPLETE
    });
  },

  getCommentsError() {
    AppDispatcher.dispatch({
      actionType: ACTION_COMMENTS_REQUEST_GET_ERROR
    });
  },

  getCommentsSuccess(listings) {
    AppDispatcher.dispatch({
      actionType: ACTION_COMMENTS_REQUEST_GET_SUCCESS,
      listings: listings
    });
  }

}

