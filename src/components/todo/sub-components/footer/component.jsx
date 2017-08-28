import React from 'react';
import PropTypes from 'prop-types';

class TodoFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (<div>
      <button
        type="button"
        onClick={() => {
          this.props.switchFilter(0);
        }}
      >All
      </button>
      <button
        type="button"
        onClick={() => {
          this.props.switchFilter(1);
        }}
      >Todo
      </button>
      <button
        type="button"
        onClick={() => {
          this.props.switchFilter(2);
        }}
      >Done
      </button>
    </div>);
  }
}

export default TodoFooter;
