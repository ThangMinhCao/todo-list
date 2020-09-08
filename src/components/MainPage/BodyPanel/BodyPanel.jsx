import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Tooltip from '@material-ui/core/Tooltip';
import ViewListIcon from '@material-ui/icons/ViewList';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { v4 as uuidv4 } from 'uuid';
import './BodyPanel.scss';
import TodoPanel from './TodoPanel/TodoPanel';
import ListPanel from './ListPanel/ListPanel';
import Colors from '../../../constants/colors';
import ListTypes from '../../../constants/list';

const useStyle = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(3),
    left: theme.spacing(3),
  },

  todoDialIcon: {
    color: theme.palette.info.main,
  },

  ramindersDialIcon: {
    color: theme.palette.warning.main,
  },

  scheduleDialIcon: {
    color: theme.palette.success.main,
  },

  loadingBar: {
    position: 'fixed',
    top: 60,
    left: 0,
    right: 0,
  },
}));

export default function BodyPanel() {
  const [lists, setLists] = React.useState([]);
  const [speedDialState, setSpeedDialState] = React.useState(false);
  const [selectedListKey, setSelectedList] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [editing, setEditting] = React.useState(false);
  const [itemEditingNewContent, setItemEdittingNewContent] = React.useState('');
  const [editingItemID, setEditingItemID] = React.useState('');
  const styleClasses = useStyle();

  const onAddTodoList = (listName, listType) => {
    const listID = uuidv4();
    setLists([...lists, {
      id: listID, name: listName, type: listType, items: [],
    }]);
  };

  const actions = [
    { function: onAddTodoList, icon: <ViewListIcon style={{ color: Colors.todo }} />, name: 'To-do list' },
    // { function: onAddTodoList, icon: <NotificationsActiveIcon style={{ color: Colors.reminders }} />, name: 'Reminders' },
    // { function: onAddTodoList, icon: <EventNoteIcon style={{ color: Colors.schedule }} />, name: 'Schedule' },
  ];

  const onToggleLoading = () => {
    setLoading(!loading);
  };

  const onAddItem = (item) => {
    const newList = lists.map((list) => {
      if (list.id !== selectedListKey) {
        return list;
      }
      return {
        ...list, items: [...list.items, item],
      };
    });
    setLists(newList);
  };

  const onDeleteItem = (itemID) => {
    setLists(lists.map((list) => {
      if (list.id !== selectedListKey) {
        return list;
      }
      return { ...list, items: list.items.filter((item) => item.id !== itemID) };
    }));
  };

  const toggleDial = () => {
    setSpeedDialState(!speedDialState);
  };

  const onChangeList = (listID) => {
    // const foundList = lists.find((list) => list.id === listID);
    setSelectedList(listID);
  };

  const onToggleFinished = (itemID) => {
    const newList = lists.map((list) => {
      if (list.id !== selectedListKey) {
        return list;
      }
      return {
        ...list,
        items: list.items.map((item) => {
          if (item.id === itemID) {
            return { ...item, finished: !item.finished };
          }
          return item;
        }),
      };
    });
    setLists(newList);
  };

  const handleCloseEditDialog = () => {
    setItemEdittingNewContent('');
    setEditting(false);
  };

  const handleFinishEditItem = () => {
    setLists(lists.map((list) => {
      if (list.id !== selectedListKey) {
        return list;
      }
      return {
        ...list,
        items: list.items.map((item) => {
          if (item.id !== editingItemID) {
            return item;
          }
          // console.log({ ...item, content: itemEditingNewContent });
          // console.log(itemEditingNewContent);
          return { ...item, content: itemEditingNewContent };
          // return { ...item, finished: true };
        }),
      };
    }));
    handleCloseEditDialog();
  };

  const handleOpenEditDialog = (itemID, currentContent) => {
    setEditingItemID(itemID);
    setItemEdittingNewContent(currentContent);
    setEditting(true);
  };

  const generateSelectedComponent = () => {
    const selectedList = lists.find((list) => list.id === selectedListKey);
    if (!selectedListKey) {
      return <div />;
    }
    if (selectedList.type === ListTypes.TODO) {
      return (
        <TodoPanel
          items={selectedList.items}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
          onToggleFinished={onToggleFinished}
          onLoading={onToggleLoading}
          onEditingItem={handleOpenEditDialog}
        />
      );
    }

    if (selectedListKey.type === ListTypes.REMINDERS) {
      return (
        // <TodoPanel list={selectedList.list} />
        <div />
      );
    }
    return (
      // <TodoPanel list={selectedList.list} />
      <div />
    );
  };

  return (
    <>
      <LinearProgress className={styleClasses.loadingBar} hidden={!loading} />
      <div className="container">
        <ListPanel
          lists={lists}
          selectedList={selectedListKey}
          onChangeList={onChangeList}
          onClickEdittingItem={handleOpenEditDialog}
        />
        {generateSelectedComponent()}
        <Tooltip title="Add new" placement="right-end">
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={styleClasses.speedDial}
            icon={<SpeedDialIcon />}
            onClose={toggleDial}
            onOpen={toggleDial}
            open={speedDialState}
            direction="up"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => action.function('TodoList', ListTypes.TODO)}
              />
            ))}
          </SpeedDial>
        </Tooltip>
      </div>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleCloseEditDialog}
        open={editing}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            fullWidth
            multiline
            rowsMax={5}
            rows={5}
            label="New content"
            value={itemEditingNewContent}
            onChange={(event) => { setItemEdittingNewContent(event.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFinishEditItem} color="primary">
            Finished
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

BodyPanel.propTypes = {
};
