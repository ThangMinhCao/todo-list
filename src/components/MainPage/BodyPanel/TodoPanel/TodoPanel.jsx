import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FlipMove from 'react-flip-move';
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';
import '../BodyPanel.scss';
import AddItemField from './AddItemField';

export default function TodoPanel({ items, onAddItem, onDeleteItem }) {
  const [failedSnackBarOpened, setFailedSnackBarOpened] = React.useState(false);
  const [successSnackBarOpened, setSuccessSnackBarOpened] = React.useState(false);

  const toggleFailedSnackbar = () => {
    setFailedSnackBarOpened(!failedSnackBarOpened);
  };

  const toggleSuccessSnackbar = () => {
    setSuccessSnackBarOpened(!successSnackBarOpened);
  };

  const toggleFinished = (id) => {
    // this.setState((prevState) => ({
    //   todoItems: prevState.todoItems.map(
    //     (item) => (item[0].key === id ? [item[0], !item[1]] : item),
    //   ),
    // }));
  };

  const onAddContent = (text) => {
    if (text === '') {
      toggleFailedSnackbar();
    } else {
      onAddItem({ id: uuidv4(), content: text, finished: false });
    }
  };

  // const onDeleteItem = (id) => {
  //   this.setState((prevState) => ({
  //     todoItems: prevState.todoItems.filter((item) => item[0].key !== id),
  //   }));
  // };

  const renderItem = (itemID, text, finished) => {
    return (
      <Item
        id={itemID}
        deleteSelf={onDeleteItem}
        key={itemID}
        content={text}
        finished={finished}
        toggleFinished={toggleFinished}
        toggleEmptyAlert={toggleFailedSnackbar}
        toggleSuccessAlert={toggleSuccessSnackbar}
      />
    );
  };

  return (
    <FlipMove enterAnimation="fade" leaveAnimation="fade" appearAnimation="fade" className="item-panel">
      <Snackbar
        open={failedSnackBarOpened}
        message="Please insert the item's content"
        onClose={toggleFailedSnackbar}
        autoHideDuration={1500}
      >
        <MuiAlert severity="error">Empty content!</MuiAlert>
      </Snackbar>
      <Snackbar
        open={successSnackBarOpened}
        message="Edit successful"
        onClose={toggleSuccessSnackbar}
        autoHideDuration={1500}
      >
        <MuiAlert severity="success">Content edited successfully!</MuiAlert>
      </Snackbar>
      <ListItem>
        <AddItemField className="add-item-field" addTodoItem={onAddContent} />
        {/* <AddItemField className="add-item-field" addTodoItem={() => onAddItem(2)} /> */}
      </ListItem>
      {/* {this.state.todoItems.sort((a, b) => a[1] - b[1]).map((item) => item[0])} */}
      {items.sort((a, b) => a.finished - b.finished)
        .map((item) => renderItem(item.id, item.content, item.finished))}
    </FlipMove>
  );
}

TodoPanel.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};
