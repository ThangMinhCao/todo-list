import React from 'react';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import FlipMove from 'react-flip-move';
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';
import '../BodyPanel.scss';
import AddItemField from './AddItemField';

export default class ListPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
    };
    this.onAddContent = this.onAddContent.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onAddContent(content) {
    this.setState((prevState) => ({
      todoItems: [...prevState.todoItems,
        this.renderItem(uuidv4(), content)],
    }));
  }

  onDeleteItem(id) {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.filter((item) => item.key !== id),
    }));
  }

  toggleFinished = (id) => {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.map(
        (item) => (item.id === id ? { ...item, checked: !item.checked } : item),
      ),
    }));
  }

  renderItem(itemID, text) {
    return (
      <Item
        id={itemID}
        deleteSelf={this.onDeleteItem}
        key={itemID}
        content={text}
        finished={false}
        onClickFinished={this.toggleFinished}
      />
    );
  }

  render() {
    return (
      <FlipMove enterAnimation="fade" leaveAnimation="fade" appearAnimation="fade" className="list-panel">
        {this.state.todoItems}
        <ListItem>
          <AddItemField className="add-item-field" addTodoItem={this.onAddContent} />
        </ListItem>
      </FlipMove>
      // <List className="list-panel">
      //   {this.state.todoItems}
      //   <Fab color="primary" className="fab-edit">
      //     <EditIcon />
      //   </Fab>
      //   <ListItem>
      //     <AddItemField className="add-item-field" addTodoItem={this.onAddContent} />
      //   </ListItem>
      // </List>
    );
  }
}
