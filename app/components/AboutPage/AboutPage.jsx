'use strict';

import React from 'react';

class AboutPage extends React.Component {

  render() {
    return (
      <div className={'mui-app-content-canvas'}>
        <article className={'article'}>
          <h2>About</h2>
          <p>This is a free EchoJS news mobile app for Android.</p>
          <p>
            The code for this application can be found here:
            <a href="https://github.com/badsyntax/echojs-mobile-client">
              https://github.com/badsyntax/echojs-mobile-client
            </a>
          </p>
          <p>
            Please report any issues you find here:
            <a href="https://github.com/badsyntax/echojs-mobile-client/issues">
              https://github.com/badsyntax/echojs-mobile-client/issues
            </a>
          </p>
        </article>
      </div>
    );
  }
}

export default AboutPage;
