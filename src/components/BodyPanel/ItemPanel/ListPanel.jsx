import React from 'react';
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
        [this.renderItem(uuidv4(), content), false]],
    }));
  }

  onDeleteItem(id) {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.filter((item) => item[0].key !== id),
    }));
  }

  toggleFinished = (id) => {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.map(
        (item) => (item[0].key === id ? [item[0], !item[1]] : item),
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
        toggleFinished={this.toggleFinished}
      />
    );
  }

  render() {
    return (
      <FlipMove enterAnimation="elevator" leaveAnimation="elevator" appearAnimation="fade" className="list-panel">
        <ListItem>
          <AddItemField className="add-item-field" addTodoItem={this.onAddContent} />
        </ListItem>
        {this.state.todoItems.sort((a, b) => a[1] - b[1]).map((item) => item[0])}
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
