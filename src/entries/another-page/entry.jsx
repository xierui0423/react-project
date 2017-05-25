import render from '../../base';
import Main from './component';

render(Main);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./component', () => {
    render(Main);
  });
}
