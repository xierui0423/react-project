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
    this.__asyncLoad();
  }

  __asyncLoad() {
    Promise.all([import(/* webpackChunkName: "test-component" */ '../../async-modules/test-component.jsx'),
      import(/* webpackChunkName: "test-component-func" */ '../../async-modules/test-component-func.jsx')],
    ).then((modules) => {
      if (module.hot) {
        module.hot.accept('../../async-modules/test-component-func.jsx', () => {
          this.__asyncLoad();
        });
      }
      this.asyncComponent = modules[0].default;
      this.asyncComponentFunc = modules[1].default;
      this.setState({ showAsync: true });
    }).catch((err) => {
      console.log('Failed to load the async component!', err);
    });
  }

  render() {
    const [Async, AsyncFunc] = [this.asyncComponent, this.asyncComponentFunc];
    return this.state.showAsync ?
      <div><Async callAsyncModule={callAsyncModule} /><AsyncFunc /></div> :
      (<div>
        Loading...
      </div>);
  }


}
export default AnotherPage;

