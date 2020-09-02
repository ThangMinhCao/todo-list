import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Tooltip from '@material-ui/core/Tooltip';
import ViewListIcon from '@material-ui/icons/ViewList';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EventNoteIcon from '@material-ui/icons/EventNote';
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
  // TODO
  const [selectedListKey, setSelectedList] = React.useState('');
  const styleClasses = useStyle();

  // const onAddList = (listName, listType) => {
  //   const listID = uuidv4();
  //   setLists([...lists, { id: listID, name: listName, type: listType }]);
  // };

  const onAddItem = (item) => {
    const newList = lists.map((list) => {
      if (list.id !== selectedListKey) {
        return list;
      }
      return {
        id: list.id, name: list.name, type: list.type, items: [...list.items, item],
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
  );
}

BodyPanel.propTypes = {
};
