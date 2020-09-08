import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import ViewListIcon from '@material-ui/icons/ViewList';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
// import EventNoteIcon from '@material-ui/icons/EventNote';
// import SpeedDial from '@material-ui/lab/SpeedDial';
// import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
// import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { v4 as uuidv4 } from 'uuid';
import './BodyPanel.scss';
import TodoPanel from './TodoPanel/TodoPanel';
import ListPanel from './ListPanel/ListPanel';
// import Colors from '../../../constants/colors';
import ListTypes from '../../../constants/list';

const useStyle = makeStyles((theme) => ({
  addButton: {
    backgroundColor: 'white',
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
  const [selectedListKey, setSelectedListKey] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [editing, setEditting] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [editingItemID, setEditingItemID] = React.useState('');
  const [addingNewList, setAddingNewList] = React.useState(false);
  const [failedSnackBarOpened, setFailedSnackBarOpened] = React.useState(false);
  const [successSnackBarOpened, setSuccessSnackBarOpened] = React.useState(false);

  const styleClasses = useStyle();
  // const [speedDialState, setSpeedDialState] = React.useState(false);

  const onAddTodoList = (listType) => {
    const listID = uuidv4();
    setLists([...lists, {
      id: listID, name: dialogContent, type: listType, items: [],
    }]);
  };

  const onDeleteTodoList = (listID) => {
    setLists(lists.filter((list) => list.id !== listID));
    setSelectedListKey('');
  };

  // const actions = [
  // { function: onAddTodoList,
  // icon: <ViewListIcon style={{ color: Colors.todo }} />, name: 'To-do list' },
  // { function: onAddTodoList,
  // icon:<NotificationsActiveIcon style={{ color: Colors.reminders }} />, name: 'Reminders' },
  // { function: onAddTodoList,
  // icon: <EventNoteIcon style={{ color: Colors.schedule }} />, name: 'Schedule' },
  // ];
  const toggleFailedSnackbar = () => {
    setFailedSnackBarOpened(!failedSnackBarOpened);
  };

  const toggleSuccessSnackbar = () => {
    setSuccessSnackBarOpened(!successSnackBarOpened);
  };

  const onToggleLoading = () => {
    setLoading(!loading);
  };

  const onAddItem = (listID, item) => {
    const newList = lists.map((list) => {
      if (list.id !== listID) {
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

  // const toggleDial = () => {
  //   setSpeedDialState(!speedDialState);
  // };

  const onChangeList = (listID) => {
    setSelectedListKey(listID);
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
    setDialogContent('');
    setEditting(false);
    setAddingNewList(false);
  };

  const handleFinishDialog = () => {
    if (!dialogContent) {
      toggleFailedSnackbar();
    } else {
      if (editing) {
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
              return { ...item, content: dialogContent };
            }),
          };
        }));
      } else {
        onAddTodoList(ListTypes.TODO);
      }
      handleCloseEditDialog();
    }
  };

  const handleOpenEditDialog = (itemID, currentContent) => {
    setEditingItemID(itemID);
    setDialogContent(currentContent);
    setEditting(true);
  };

  const handleSubmitDialog = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      handleFinishDialog();
    }
  };

  const generateSelectedComponent = () => {
    const selectedList = lists.find((list) => list.id === selectedListKey);
    if (!selectedList) {
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
          toggleFailedSnackbar={toggleFailedSnackbar}
          toggleSuccessSnackbar={toggleSuccessSnackbar}
          selectedListID={selectedListKey}
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
          onClickDelete={onDeleteTodoList}
        />
        {generateSelectedComponent()}
        <Tooltip title="Add new" placement="right-end">
          <Fab
            className={styleClasses.addButton}
            onClick={() => setAddingNewList(true)}
            // ariaLabel="SpeedDial example"
            // icon={<SpeedDialIcon />}
            // direction="up"
            // onClose={toggleDial}
            // onOpen={toggleDial}
            // open={speedDialState}
          >
            <AddIcon color="primary" />
          </Fab>
        </Tooltip>
      </div>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleCloseEditDialog}
        open={editing || addingNewList}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">{editing ? 'Edit Item' : 'Adding new To-do list'}</DialogTitle>
        <DialogContent>
          <TextField
            // inputProps={{ maxLength: 36 }}
            autoFocus
            variant="outlined"
            // margin="dense"
            fullWidth
            multiline={editing}
            rowsMax={editing ? 5 : 1}
            rows={editing ? 5 : 1}
            label={editing ? 'New content' : 'List name'}
            value={dialogContent}
            onChange={(event) => { setDialogContent(event.target.value); }}
            onKeyDown={handleSubmitDialog}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFinishDialog} color="primary">
            Finished
          </Button>
        </DialogActions>
      </Dialog>
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
    </>
  );
}

BodyPanel.propTypes = {
};
