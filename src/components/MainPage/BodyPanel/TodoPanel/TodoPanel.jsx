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

export default function TodoPanel({
  items, onAddItem, onDeleteItem, onToggleFinished, onLoading, onEditingItem,
}) {
  const [failedSnackBarOpened, setFailedSnackBarOpened] = React.useState(false);
  const [successSnackBarOpened, setSuccessSnackBarOpened] = React.useState(false);

  const toggleFailedSnackbar = () => {
    setFailedSnackBarOpened(!failedSnackBarOpened);
  };

  const toggleSuccessSnackbar = () => {
    setSuccessSnackBarOpened(!successSnackBarOpened);
  };

  const toggleFinished = (id) => {
    onToggleFinished(id);
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
        content={text}
        finished={finished}
        deleteSelf={onDeleteItem}
        key={itemID}
        toggleFinished={toggleFinished}
        toggleEmptyAlert={toggleFailedSnackbar}
        toggleSuccessAlert={toggleSuccessSnackbar}
        onEditing={onEditingItem}
      />
    );
  };

  return (
    <FlipMove
      enterAnimation="fade"
      leaveAnimation="none"
      delay={50}
      duration={105}
      appearAnimation="fade"
      className="item-panel"
    >
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
        <AddItemField onLoading={onLoading} className="add-item-field" addTodoItem={onAddContent} />
      </ListItem>
      {items.sort((a, b) => a.finished - b.finished)
        .map((item) => renderItem(item.id, item.content, item.finished))}
    </FlipMove>
  );
}

TodoPanel.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleFinished: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired,
  onEditingItem: PropTypes.func.isRequired,
};
