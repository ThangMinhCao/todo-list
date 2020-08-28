import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ViewListIcon from '@material-ui/icons/ViewList';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Tooltip from '@material-ui/core/Tooltip';
import './ListPanel.scss';
import ListTypes from '../../../../constants/list';

const useStyle = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingLeft: 20,
  },

  listText: {
    wordBreak: 'break-word',
  },

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

const mainColors = {
  todo: '#115293',
  reminders: '#d32f2f',
  schedule: '#388e3c',
};

const actions = [
  { icon: <ViewListIcon style={{ color: mainColors.todo }} />, name: 'To-do list' },
  { icon: <NotificationsActiveIcon style={{ color: mainColors.reminders }} />, name: 'Reminders' },
  { icon: <EventNoteIcon style={{ color: mainColors.schedule }} />, name: 'Schedule' },
];

export default function ListPanel() {
  const [selectedList, setSelectedList] = React.useState('list1');
  const [speedDialState, setSpeedDialState] = React.useState(false);
  const styleClasses = useStyle();

  const onChangeCurrentList = (event, newValue) => {
    setSelectedList(newValue);
  };

  const toggleDial = () => {
    setSpeedDialState(!speedDialState);
  };

  const listComponents = () => {
    return (
      lists.map((list, index) => (
        <ListItem
          button
          className={styleClasses.list}
          key={list.id}
          selected={selectedList === list.id}
        >
          <ListItemText
            className={styleClasses.listText}
            primary={(
              <Typography variant="h6">
                {list.name}
              </Typography>
            )}
          />
        </ListItem>
      ))
    );
  };

  return (
    <div className="list-panel">
      <List>
        {listComponents()}
        <Divider />
      </List>
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
