import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
      snackBarOpened: false,
    };
    this.onAddContent = this.onAddContent.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onAddContent(content) {
    if (content === '') {
      this.toggleSnackbar();
    } else {
      this.setState((prevState) => ({
        todoItems: [...prevState.todoItems,
          [this.renderItem(uuidv4(), content), false]],
      }));
    }
  }

  onDeleteItem(id) {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.filter((item) => item[0].key !== id),
    }));
  }

  toggleSnackbar = () => {
    this.setState((prevstate) => ({
      snackBarOpened: !prevstate.snackBarOpened,
    }));
    // console.log(this.state.snackBarOpened)
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
        toggleEmptyAlert={this.toggleSnackbar}
      />
    );
  }

  render() {
    return (
      <FlipMove enterAnimation="elevator" leaveAnimation="fade" appearAnimation="fade" className="list-panel">
        <Snackbar
          open={this.state.snackBarOpened}
          message="Please insert the item's content"
          onClose={this.toggleSnackbar}
          autoHideDuration={1500}
        >
          <MuiAlert severity="error">Empty content!</MuiAlert>
        </Snackbar>
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
