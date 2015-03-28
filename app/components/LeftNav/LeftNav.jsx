import './_LeftNav.scss';

import React from 'react';
import Router from 'react-router';
import mui from 'material-ui';

let menuItems = [
    { route: 'home', text: 'Posts' },
    { route: 'about', text: 'About' }
  ];

class LeftNav extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      selectedIndex: null
    }
  }

  render() {
    var header = <div className={'logo'} onClick={this._onHeaderClick.bind(this)}>Echo JS</div>;

    return (
      <mui.LeftNav
        ref={'leftNav'}
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange.bind(this)} />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    };
  }

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }

  _onHeaderClick() {
    this.context.router.transitionTo('home');
    this.refs.leftNav.close();
  }
}

LeftNav.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default LeftNav;
