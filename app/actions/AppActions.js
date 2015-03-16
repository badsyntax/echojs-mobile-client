'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import EchoJSAPI from '../services/EchoJSAPI';
import ListingStore from '../stores/ListingStore';
import CommentsStore from '../stores/CommentsStore';

import {
  ACTION_LISTINGS_GET,
  ACTION_COMMENTS_GET,
  LISTINGS_REQUEST_GET_SUCCESS,
  COMMENTS_REQUEST_GET_SUCCESS
} from '../constants/AppConstants';

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case LISTINGS_REQUEST_GET_SUCCESS:
      CommentsStore.setAll([]);
      ListingStore.setAll(action.listings);
      break;
    case COMMENTS_REQUEST_GET_SUCCESS:
      ListingStore.setAll([]);
      CommentsStore.setAll(action.comments);
      break;
    case ACTION_LISTINGS_GET:
      EchoJSAPI.getListings();
      break;
    case ACTION_COMMENTS_GET:
      EchoJSAPI.getComments(action.newsId);
      break;
    default:
  }
});

export default {

  getListings() {
    AppDispatcher.dispatch({
      actionType: ACTION_LISTINGS_GET
    });
  },

  getComments(newsId) {
    alert(newsId);
    AppDispatcher.dispatch({
      actionType: ACTION_COMMENTS_GET,
      newsId: newsId
    });
  }
}

