import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListTypes from '../../../../constants/list';
import Colors from '../../../../constants/colors';
// import './ListPanel.scss';

const useStyle = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingLeft: 15,
    borderLeft: '5px solid',
    borderRight: '2px solid',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  todo: {
    borderLeftColor: Colors.todo,
    borderRightColor: Colors.todo,
    '&$selected': {
      backgroundColor: Colors.todoSelected,
      '&:hover': {
        backgroundColor: Colors.todoHover,
      },
    },
  },

  reminders: {
    borderLeftColor: Colors.reminders,
    borderRightColor: Colors.reminders,
    '&$selected': {
      backgroundColor: Colors.remindersSelected,
      '&:hover': {
        backgroundColor: Colors.reminderHover,
      },
    },
  },

  schedule: {
    borderLeftColor: Colors.schedule,
    borderRightColor: Colors.schedule,
    '&$selected': {
      backgroundColor: Colors.scheduleSelected,
      '&:hover': {
        backgroundColor: Colors.scheduleHover,
      },
    },
  },

  selected: {},

  listText: {
    wordBreak: 'break-word',
  },

  emptyText: {
    flex: 1,
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.disabled,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(0.4vh + 0.4vw + 15px)',
  },
}));

export default function ListPanel(props) {
  const styleClasses = useStyle();
  const { lists, onChangeList, selectedList } = props;

  const getClassNameByType = (listType) => {
    if (listType === ListTypes.TODO) {
      return styleClasses.todo;
    }
    if (listType === ListTypes.REMINDERS) {
      return styleClasses.reminders;
    }
    return styleClasses.schedule;
  };

  const generateLists = () => {
    if (!Array.isArray(lists) || !lists.length) {
      return (
        <Typography className={styleClasses.emptyText} variant="h6">
          Empty collection
        </Typography>
      );
    }
    return (
      lists.map((list) => (
        <ListItem
          button
          classes={{
            root: styleClasses.list,
            selected: styleClasses.selected,
          }}
          className={`${styleClasses.list} ${getClassNameByType(list.type)}`}
          key={list.id}
          selected={selectedList === list.id}
          onClick={() => onChangeList(list.id)}
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
        {generateLists()}
      </List>
    </div>
  );
}

ListPanel.propTypes = {
  lists: PropTypes.arrayOf(Object).isRequired,
  onChangeList: PropTypes.func.isRequired,
  selectedList: PropTypes.string.isRequired,
};
