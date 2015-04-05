'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  POSTS_UPDATED,
  ACTION_POSTS_GET,
  ACTION_POSTS_GET_SUCCESS,
  ACTION_REFRESH_NEWS
} from '../constants/AppConstants';

class NewsStore extends BaseStore {

  emitChange() {
    this.emit(POSTS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(POSTS_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(POSTS_UPDATED, callback);
  }
}

let store = new NewsStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ACTION_POSTS_GET:
    case ACTION_REFRESH_NEWS:
      store.setAll([]);
      break;
    case ACTION_POSTS_GET_SUCCESS:
      store.setAll(action.posts);
      break;
    default:
  }
});

export default store;
