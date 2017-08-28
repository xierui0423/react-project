import React from 'react';
import PropTypes from 'prop-types';

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  updateValue(val) {
    this.setState({ value: val });
  }

  render() {
    return (<input
      type="text"
      value={this.state.value}
      onChange={(e) => {
        this.updateValue(e.target.value);
      }}
      onKeyPress={(e) => {
        if (e.which === 13) this.props.createItem(e.target.value);
      }}
    />);
  }
}

TodoInput.propTypes = {
  createItem: PropTypes.func.isRequired,
};

export default TodoInput;
