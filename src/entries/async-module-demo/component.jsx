import React from 'react';

const callAsyncModule = () => {
  // Async module importing
  import(/* webpackChunkName: "test-module" */ '../../async-modules/test-module.js').then((asyncModule) => {
    asyncModule.default.loaded();
  }).catch((err) => {
    console.log('Failed to load the async module!', err);
  });
};

class AnotherPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Promise.all([import(/* webpackChunkName: "test-component" */ '../../async-modules/test-component.jsx'),
      import(/* webpackChunkName: "test-component-func" */ '../../async-modules/test-component-func.jsx')],
    ).then((modules) => {
      this.asyncComponent = modules[0].default;
      this.asyncComponentFunc = modules[1].default;
      this.setState({ showAsync: true });
    }).catch((err) => {
      console.log('Failed to load the async component!', err);
    });
  }

  render() {
    return this.state.showAsync ? React.createElement('div', {},
      [React.createElement(this.asyncComponent, { key: '1', callAsyncModule }), React.createElement(this.asyncComponentFunc, { key: '2' })]) :
      (<div>
        Loading...
      </div>);
  }
}
export default AnotherPage;

