import React from 'react';

import HelloWorld from '../../components/hello-world/hello-world';
import HelloWorldFunc from '../../components/hello-world-func/hello-world-func';

const callAsyncModule = () => {
  import('../../async-modules/test.js').then((asyncModule) => {
    asyncModule.default.loaded();
  }).catch((err) => {
    console.log('Failed to load the async module!', err);
  });
};


const AnotherPage = () =>
    (<div>
      <HelloWorld callAsyncModule={callAsyncModule} />
      <HelloWorldFunc />
    </div>);

export default AnotherPage;

