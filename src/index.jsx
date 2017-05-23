import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

// TODO drop the hot loading process on production build
// eslint-disable-next-line
import { AppContainer } from 'react-hot-loader';

import App from './app';

window.$ = jQuery.noConflict();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
      document.getElementById('app'),
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    render(App);
  });
}
