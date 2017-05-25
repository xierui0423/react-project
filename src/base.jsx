import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

// TODO drop the hot loading process on production build
// eslint-disable-next-line
import { AppContainer } from 'react-hot-loader';

window.$ = jQuery.noConflict();

const render = (Feed) => {
  ReactDOM.render(
    <AppContainer>
      <Feed />
    </AppContainer>,
      document.getElementById('app'),
  );
};

export default render;

