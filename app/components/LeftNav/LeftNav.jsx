import './_LeftNav.scss';

import React from 'react';
import util from 'util';

import {
  MenuItem,
  LeftNav as MuiLeftNav
} from 'material-ui';

import {
  BUG_REPORT_EMAIL,
  BUG_REPORT_SUBJECT,
  BUG_REPORT_BODY
} from '../../constants/AppConstants';

let emailLink = util.format(
  'mailto:%s?subject=%s&body=%s',
  encodeURIComponent(BUG_REPORT_EMAIL),
  encodeURIComponent(BUG_REPORT_SUBJECT),
  encodeURIComponent(BUG_REPORT_BODY)
);

let menuItems = [
  { route: 'home', text: 'Posts' },
  { route: 'about', text: 'About' },
  {
    type: MenuItem.Types.LINK,
    payload: emailLink,
    text: 'Report an issue',
    target: '_blank'
  }
];

class LeftNav extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      selectedIndex: null
    };
  }

  render() {
    var header = <div className={'logo'} onClick={this.onHeaderClick.bind(this)}>Echo JS</div>;

    return (
      <MuiLeftNav
        docked={false}
        header={header}
        isInitiallyOpen={false}
        menuItems={menuItems}
        onChange={this.onLeftNavChange.bind(this)}
        ref={'leftNav'}
        selectedIndex={this.getSelectedIndex()} />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  getSelectedIndex() {
    for (let i = menuItems.length - 1; i >= 0; i--) {
      let currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) { return i; }
    }
  }

  onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }

  onHeaderClick() {
    this.context.router.transitionTo('home');
    this.refs.leftNav.close();
  }
}

LeftNav.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default LeftNav;
