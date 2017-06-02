import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line
class AsyncComponent extends React.Component {

  render() {
    return (
      <button onClick={this.props.callAsyncModule}>This is a full life cycle async
        component.</button>);
  }
}

AsyncComponent.defaultProps = {
  callAsyncModule: () => { console.log('No callback assigned!'); },
};

AsyncComponent.propTypes = {
  callAsyncModule: PropTypes.func,
};

export default AsyncComponent;

