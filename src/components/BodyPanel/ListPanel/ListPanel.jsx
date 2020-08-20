import React from 'react';
import List from '@material-ui/core/List';
import Item from './Item';

export default class ListPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItemContents: [],
    };
    this.onAddContent = this.onAddContent.bind(this);
  }

  onAddContent(itemID, content) {
    this.setState((prevState) => ({
      todoItemContents: [...prevState.todoItemContents,
        { id: itemID, val: content, checked: false }],
    }));
    this.onDeleteCheckedItems();
  }

  onDeleteCheckedItems() {
    this.setState((prevState) => ({
      todoItemContents: prevState.todoItemContents.filter((item) => !item.checked),
    }));
  }

  toggleCheckBox = (id) => {
    this.setState((prevState) => ({
      todoItemContents: prevState.todoItemContents.map(
        (item) => (item.id === id ? { ...item, checked: !item.checked } : item),
      ),
    }));
  }

  render() {
    return (
      <List className="list">
        {this.state.todoItemContents.map(
          (item) => (
            <Item
              id={item.id}
              key={item.id}
              content={item.val}
              checked={item.checked}
              onClickCheckBox={this.toggleCheckBox}
            />
          ),
        )}
      </List>
    );
  }
}
