import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

// eslint-disable-next-line
class AsyncComponent extends React.Component {

  render() {
    return (
      <div className={style['hello-world']}>
        <button onClick={this.props.callAsyncModule}>This is a full life cycle async
        component!!!</button>
      </div>);
  }
}

AsyncComponent.defaultProps = {
  callAsyncModule: () => { console.log('No callback assigned!'); },
};

AsyncComponent.propTypes = {
  callAsyncModule: PropTypes.func,
};

export default AsyncComponent;

