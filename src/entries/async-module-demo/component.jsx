import React from 'react';

const callAsyncModule = () => {
  // Async module importing
  import(/* webpackChunkName: "async-test" */ '../../components/helper-modules/async-test.js').then((asyncModule) => {
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
    Promise.all([import(/* webpackChunkName: "hello-world-async-test" */ '../../components/hello-world-async-test/component.jsx'),
      import(/* webpackChunkName: "hello-world-func-async-test" */ '../../components/hello-world-func-async-test/component.jsx')],
    ).then((modules) => {
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

