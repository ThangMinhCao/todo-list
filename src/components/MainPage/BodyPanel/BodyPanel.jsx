import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Tooltip from '@material-ui/core/Tooltip';
import ViewListIcon from '@material-ui/icons/ViewList';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EventNoteIcon from '@material-ui/icons/EventNote';
// import { v4 as uuidv4 } from 'uuid';
import './BodyPanel.scss';
import ItemPanel from './ItemPanel/ItemPanel';
import ListPanel from './ListPanel/ListPanel';
import Colors from '../../../constants/colors';

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
  const [lists, setLists] = React.useState([{ id: 'list1', name: 'List 1' }, { id: 'list2', name: 'List 2'}]);
  const [speedDialState, setSpeedDialState] = React.useState(false);
  const [selectedList, setSelectedList] = React.useState('');
  const styleClasses = useStyle();

  // const onAddList = (listName, listType) => {
  //   const listID = uuidv4();
  //   setLists([...lists, { id: listID, name: listName, type: listType }]);
  // };

  const toggleDial = () => {
    setSpeedDialState(!speedDialState);
  };

  const onChangeList = (listID) => {
    setSelectedList(listID);
  };

  return (
    <div className="container">
      <ListPanel lists={lists} selectedList={selectedList} onChangeList={onChangeList} />
      <ItemPanel />
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
