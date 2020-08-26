import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FlipMove from 'react-flip-move';
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';
import '../BodyPanel.scss';
import AddItemField from './AddItemField';

export default class ItemPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      failedSnackBarOpened: false,
      successSnackBarOpened: false,
    };
    this.onAddContent = this.onAddContent.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onAddContent(content) {
    if (content === '') {
      this.toggleFailedSnackbar();
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

  toggleFailedSnackbar = () => {
    this.setState((prevstate) => ({
      failedSnackBarOpened: !prevstate.failedSnackBarOpened,
    }));
  }

  toggleSuccessSnackbar = () => {
    this.setState((prevstate) => ({
      successSnackBarOpened: !prevstate.successSnackBarOpened,
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
        toggleEmptyAlert={this.toggleFailedSnackbar}
        toggleSuccessAlert={this.toggleSuccessSnackbar}
      />
    );
  }

  render() {
    return (
      <FlipMove enterAnimation="fade" leaveAnimation="fade" appearAnimation="fade" className="item-panel">
        <Snackbar
          open={this.state.failedSnackBarOpened}
          message="Please insert the item's content"
          onClose={this.toggleFailedSnackbar}
          autoHideDuration={1500}
        >
          <MuiAlert severity="error">Empty content!</MuiAlert>
        </Snackbar>
        <Snackbar
          open={this.state.successSnackBarOpened}
          message="Edit successful"
          onClose={this.toggleSuccessSnackbar}
          autoHideDuration={1500}
        >
          <MuiAlert severity="success">Content edited successfully!</MuiAlert>
        </Snackbar>
        <ListItem>
          <AddItemField className="add-item-field" addTodoItem={this.onAddContent} />
        </ListItem>
        {this.state.todoItems.sort((a, b) => a[1] - b[1]).map((item) => item[0])}
      </FlipMove>
    );
  }
}
