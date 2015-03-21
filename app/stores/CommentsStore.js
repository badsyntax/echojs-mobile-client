'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  COMMENTS_UPDATED,
  ACTION_COMMENTS_REQUEST_GET_SUCCESS
} from '../constants/AppConstants';

class CommentsStore extends BaseStore {

  emitChange() {
    this.emit(COMMENTS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(COMMENTS_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(COMMENTS_UPDATED, callback);
  }
}

let store = new CommentsStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ACTION_COMMENTS_REQUEST_GET_SUCCESS:
      store.setAll(action.comments);
      break;
    default:
  }
});

export default store;
