'use strict';

import './_CommentsListItem.scss';

import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import AppActions from '../../actions/AppActions';

let { PropTypes } = React;

class CommentsListItem extends React.Component {

  getClassName() {
    return classnames('comments-list-item');
  }

  render() {
    let item = this.props.item;
    let timeFromNow = moment(new Date(item.ctime * 1000)).fromNow();
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
