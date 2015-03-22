'use strict';

import './_NewsListItem.scss';

import React from 'react';
import Router from 'react-router';
import classnames from 'classnames';
import moment from 'moment';

let { PropTypes } = React;
let { Link } = Router;

class NewsListItem extends React.Component {

  getClassName() {
    return classnames('listing-item');
  }

  render() {
    let item = this.props.item;
    let timeFromNow = moment(new Date(item.ctime * 1000)).fromNow();
    return (
      <article className={this.getClassName()}>
        <h2>
          <a rel="nofollow" href={item.url}>
            {item.title}
          </a>
        </h2>
        <p>
          <span>{item.up} up and {item.down} down,</span>
          <span>posted by {item.username} {timeFromNow}</span>
          <span>with </span>
          <Link to="post" params={{postId: this.props.item.id}}>
            {item.comments} comments
          </Link>
        </p>
      </article>
    );
  }
}

NewsListItem.propTypes =  {
  item: PropTypes.object.isRequired
};

export default NewsListItem;
