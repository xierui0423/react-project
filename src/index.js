import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import { AppContainer } from 'react-hot-loader';

import App from './app.jsx';

window.$ = jQuery.noConflict();

const render = (App) => {
  ReactDOM.render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.getElementById('app')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    render(App)
  });
}