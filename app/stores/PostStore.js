'use strict';

import _ from 'lodash';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  SINGLE_POST_UPDATED,
  ACTION_SINGLE_POST_GET_SUCCESS
} from '../constants/AppConstants';

class PostStore extends EventEmitter {

  constructor(...args) {
    super(...args);
    this.reset();
  }

  reset() {
    this.data = {};
  }

  set(key, data) {

    if (typeof key === 'object') {
      _.merge(this.data, key);
    } else {
      this.data[key] = data;
    }

    this.emitChange();
  }

  get(key) {
    return this.data[key];
  }

  emitChange() {
    this.emit(SINGLE_POST_UPDATED);
  }

  addChangeListener(callback) {
    this.on(SINGLE_POST_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(SINGLE_POST_UPDATED, callback);
  }
}

let store = new PostStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ACTION_SINGLE_POST_GET_SUCCESS:
      store.set({
        comments: action.comments
      });
      break;
    default:
  }
});

export default store;
