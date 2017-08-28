import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import { AppContainer } from 'react-hot-loader';

// fonts and third party styles
/* eslint-disable */
import theBullyFont from '../../assets/fonts/the-bully.ttf';
import fonts from '../../assets/fonts/fonts.css';
import icons from '../../assets/iconmoon/style.css';
/* eslint-enable */

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
