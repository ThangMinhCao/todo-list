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

const actions = [
  { icon: <ViewListIcon style={{ color: Colors.todo }} />, name: 'To-do list' },
  { icon: <NotificationsActiveIcon style={{ color: Colors.reminders }} />, name: 'Reminders' },
  { icon: <EventNoteIcon style={{ color: Colors.schedule }} />, name: 'Schedule' },
];

export default function BodyPanel() {
  const [lists, setLists] = React.useState([
    {
      id: 'list1', name: 'List 1', type: ListTypes.TODO, items: [],
    },

    {
      id: 'list2', name: 'List 2', type: ListTypes.TODO, items: [],
    },
  ]);
  const [speedDialState, setSpeedDialState] = React.useState(false);
  const [selectedListKey, setSelectedList] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const styleClasses = useStyle();

  const onAddTodoList = (listName, listType) => {
    const listID = uuidv4();
    setLists([...lists, { id: listID, name: listName, type: listType }]);
  };

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
        <ListPanel lists={lists} selectedList={selectedListKey} onChangeList={onChangeList} />
        {/* <ListPanel lists={lists} selectedList={selectedListKey} onChangeList={onAddItem} /> */}
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
                onClick={toggleDial}
              />
            ))}
          </SpeedDial>
        </Tooltip>
      </div>
    </>
  );
}

BodyPanel.propTypes = {
};
