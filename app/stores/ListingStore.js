'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  LISTINGS_UPDATED,
  ACTION_LISTINGS_GET,
  ACTION_LISTINGS_GET_SUCCESS
} from '../constants/AppConstants';

class ListingStore extends BaseStore {

  emitChange() {
    this.emit(LISTINGS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(LISTINGS_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(LISTINGS_UPDATED, callback);
  }
}

var store = new ListingStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ACTION_LISTINGS_GET:
      store.setAll([]);
      break;
    case ACTION_LISTINGS_GET_SUCCESS:
      store.setAll(action.listings);
      break;
    default:
  }
});

export default store;
