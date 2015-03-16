'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  LISTINGS_UPDATED,
  LISTINGS_REQUEST_GET_SUCCESS
} from '../constants/AppConstants';

class ListingStore extends BaseStore {

  emitChange() {
    this.emit(LISTINGS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(LISTINGS_UPDATED, callback);
  }
}

var store = new ListingStore();

export default store;
