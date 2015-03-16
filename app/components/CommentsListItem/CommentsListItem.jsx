'use strict';

import './_CommentsListItem.scss';

import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import AppActions from '../../actions/AppActions';

var { PropTypes } = React;

class CommentsListItem extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      isSelected: false
    };
  }

  toggleSelected() {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }

  isSelected() {
    return this.state.isSelected;
  }

  getClassName() {
    return classnames({
      'comments-list-item': true,
      '-selected': this.isSelected()
    });
  }

  render() {
    var item = this.props.item;
    var timeFromNow = moment(new Date(item.ctime * 1000)).fromNow();
    return (
      <article className={this.getClassName()}>
        {this.props.item.body}
      </article>
    );
  }
}

CommentsListItem.propTypes =  {
  item: PropTypes.object.isRequired
};

export default CommentsListItem;
