import render from '../../base';
import Page from './component';

render(Page);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./component', () => {
    render(Page);
  });
}
