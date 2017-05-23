import React from 'react';

class HelloWorld extends React.Component {
  componentWillMount() {
    console.log('component will mount!');
  }

  componentDidMount() {
    console.log('component did mount!');
  }

  componentWillUnmount() {
    console.log('component will unmount!');
  }

  render () {
    return (<div>Hello World!!! (from the full lifecycle component)</div>);
  }
}


export default HelloWorld;