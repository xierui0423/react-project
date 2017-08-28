import React from 'react';

import TodoInput from './sub-components/input/component';
import TodoItem from './sub-components/item/component';
import TodoFooter from './sub-components/footer/component';


class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        value: 'what',
      },
      items: [{ id: 1, value: 'test1', isEditing: true, todo: true }, {
        id: 2,
        value: 'test2',
        isEditing: false,
        todo: true,
      }],
      filterState: 0,
    };

    this.createItem = this.createItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.switchFilter = this.switchFilter.bind(this);

    this.updateValue = this.updateValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  createItem(val) {
    this.setState({
      items: this.state.items.concat([{
        id: new Date().getTime(),
        value: val,
        isEditing: false,
        todo: true,
      }]),
    });
  }

  removeItem(id) {
    this.setState({
      items: this.state.items.filter(item => item.id !== id),
    });
  }

  updateValue(id, value) {
    const items = [...this.state.items];
    const selectedItem = items.find(item => item.id === id);

    if (selectedItem) {
      selectedItem.value = value;
      this.setState({ items });
    }
  }

  toggleEdit(id) {
    const items = [...this.state.items];
    const selectedItem = items.find(item => item.id === id);

    if (selectedItem) {
      selectedItem.isEditing = !selectedItem.isEditing;
      this.setState({ items });
    }
  }

  toggleTodo(id) {
    const items = [...this.state.items];
    const selectedItem = items.find(item => item.id === id);

    if (selectedItem) {
      selectedItem.todo = !selectedItem.todo;
      this.setState({ items });
    }
  }


  switchFilter(filterState) {
    this.setState({
      filterState,
    });
  }

  render() {
    return (<div><TodoInput {...this.state.input} createItem={this.createItem} />
      {this.state.items.filter((item) => {
        switch (this.state.filterState) {
          case 0:
            return true;
          case 1:
            return item.todo;
          case 2:
            return !item.todo;
          default:
            return true;
        }
      },
      ).map(item => (
        <TodoItem
          key={item.id}
          {...item}
          removeItem={this.removeItem}
          updateValue={this.updateValue}
          toggleEdit={this.toggleEdit}
          toggleTodo={this.toggleTodo}
        />))
      }
      <TodoFooter switchFilter={this.switchFilter} />
    </div>);
  }
}


export default Todo;
