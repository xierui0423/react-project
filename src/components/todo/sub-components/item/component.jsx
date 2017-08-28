import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.isEditing ? (
      <div><input type="checkbox" checked={!this.props.todo} onChange={() => { this.props.toggleTodo(this.props.id); }} /><input
        type="text"
        value={this.props.value}
        onChange={(e) => { this.props.updateValue(this.props.id, e.target.value); }}
      />
        <button
          type="button"
          onClick={() => { this.props.toggleEdit(this.props.id); }}
        >Save
        </button>
      </div>
    ) : (
      <div><input type="checkbox" checked={!this.props.todo} onChange={() => { this.props.toggleTodo(this.props.id); }} /><input type="text" disabled readOnly value={this.props.value} />
        <button type="button" onClick={() => { this.props.toggleEdit(this.props.id); }}>Edit</button>
        <button
          type="button"
          onClick={() => {
            this.props.removeItem(this.props.id);
          }}
        >Remove
        </button>
      </div>
    );
  }
}


export default TodoItem;
