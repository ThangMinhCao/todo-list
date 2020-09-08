import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';

import FlipMove from 'react-flip-move';
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';
import '../BodyPanel.scss';
import AddItemField from './AddItemField';

export default function TodoPanel({
  items, onAddItem, onDeleteItem, onToggleFinished, onLoading,
  onEditingItem, toggleFailedSnackbar, toggleSuccessSnackbar, selectedListID,
}) {
  const toggleFinished = (id) => {
    onToggleFinished(id);
  };

  const onAddContent = (selectedID, text) => {
    if (text === '') {
      toggleFailedSnackbar();
    } else {
      onAddItem(selectedID, { id: uuidv4(), content: text, finished: false });
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
      leaveAnimation="fade"
      delay={50}
      duration={105}
      appearAnimation="fade"
      className="item-panel"
    >
      <ListItem>
        <AddItemField
          onLoading={onLoading}
          className="add-item-field"
          addTodoItem={onAddContent}
          selectedListID={selectedListID}
        />
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
  toggleFailedSnackbar: PropTypes.func.isRequired,
  toggleSuccessSnackbar: PropTypes.func.isRequired,
  selectedListID: PropTypes.string.isRequired,
};
