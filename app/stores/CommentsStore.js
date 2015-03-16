'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  COMMENTS_UPDATED,
  COMMENTS_REQUEST_GET_SUCCESS
} from '../constants/AppConstants';

class CommentsStore extends BaseStore {

  emitChange() {
    this.emit(COMMENTS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(COMMENTS_UPDATED, callback);
  }
}

var store = new CommentsStore();

export default store;
