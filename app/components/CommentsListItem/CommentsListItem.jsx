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
        <ul className="comments-list-item__metadata">
          <li className="comments-list-item__metadata-author">
            <a href={'http://www.echojs.com/user/' + item.username}>{item.username}</a>
          </li>
          <li className="comments-list-item__metadata-time">
            {timeFromNow}
          </li>
        </ul>
        <div className="comments-list-item__body">{item.body}</div>
      </article>
    );
  }
}

CommentsListItem.propTypes = {
  item: PropTypes.object.isRequired,
  comments: PropTypes.string
};

export default CommentsListItem;
