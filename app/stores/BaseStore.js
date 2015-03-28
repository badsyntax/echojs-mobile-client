'use strict';

import EventEmitter from 'events';

export default class BaseStore extends EventEmitter {

  constructor(...args) {
    super(...args);
    this.reset();
  }

  reset() {
    this.setAll([]);
  }

  setAll(items) {
    this.data = new Set(items);
    this.emitChange();
  }

  getAll() {
    return Array.from(this.data);
  }

  getBy(key, val) {
    return this.getAll().filter((post) => {
      return post[key] === val;
    })[0];
  }

  set(item) {
    if (!this.data.has(item)) {
      this.data.add(item);
      this.emitChange();
    }
  }

  remove(item) {
    this.data.delete(item);
    this.emitChange();
  }

  emitChange() {}
}
