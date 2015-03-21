'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Router from 'react-router';

let { Route, Redirect, RouteHandler, Link } = Router;

export default class App extends React.Component {

  render() {
    return (
      <div className={'app'}>
        <Header />
        <div className={'body'}>
          <RouteHandler/>
        </div>
        <Footer />
      </div>
    );
  }
}
