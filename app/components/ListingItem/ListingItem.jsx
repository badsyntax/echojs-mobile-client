'use strict';

import './_ListingItem.scss';

import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';

import { COMMENTS_CLICK } from '../../constants/AppConstants';

var { PropTypes } = React;

class ListingItem extends React.Component {

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
      'listing-item': true,
      '-selected': this.isSelected()
    });
  }

  handleCommentsClick() {
    AppActions.getComments(this.props.item.id);
  }

  render() {
    var item = this.props.item;
    var timeFromNow = moment(new Date(item.ctime * 1000)).fromNow();
    return (
      <article className={this.getClassName()}>
        <h2>
          <a rel="nofollow" href={item.url}>
            {item.title}
          </a>
        </h2>
        <p>
          {item.up} up and {item.down} down,
          posted by {item.username} {timeFromNow}
          with <a onClick={this.handleCommentsClick.bind(this)} href={'/#/comments/'+this.props.item.id}>{item.comments} comments</a>
        </p>
      </article>
    );
  }
}

ListingItem.propTypes =  {
  item: PropTypes.object.isRequired
};

export default ListingItem;
