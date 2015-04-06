'use strict';

import './_NewsListItem.scss';

import React from 'react';
import Router from 'react-router';
import classnames from 'classnames';
import moment from 'moment';

import ReactIntl from 'react-intl';

let { FormattedRelative } = ReactIntl;

let { PropTypes } = React;
let { Link } = Router;

class NewsListItem extends React.Component {

  getClassName() {
    return classnames('listing-item');
  }

  render() {
    let item = this.props.item;
    let time = new Date(item.ctime * 1000);
    return (
      <article className={this.getClassName()}>
        <h2>
          <a rel="nofollow" href={item.url}>
            {item.title}
          </a>
        </h2>
        <footer className={'listing-item-metadata'}>
          <span>{item.up} up and {item.down} down,</span>
          <span>posted by</span>
          <span>
            <a href={'http://echojs.com/user/' + item.username} target="_blank">
              {item.username}
            </a>
          </span>
          <span><FormattedRelative value={time} /></span>
          <span>with</span>
          <span>
            <Link to="post" params={{postId: this.props.item.id}}>
              {item.comments} comments
            </Link>
          </span>
        </footer>
      </article>
    );
  }
}

NewsListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default NewsListItem;
