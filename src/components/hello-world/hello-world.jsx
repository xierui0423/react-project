import React from 'react';
import style from './hello-world.scss';

class HelloWorld extends React.Component {
  componentWillMount() {
    // TODO Auto-drop console use on production build
    console.log('component will mount!');
  }

  componentDidMount() {
    console.log('component did mount!');
  }

  componentWillUnmount() {
    console.log('component will unmount!');
  }

  render() {
    return (<div className={style['hello-world']}>Hello World!!! (from the full lifecycle component)</div>);
  }
}


export default HelloWorld;
