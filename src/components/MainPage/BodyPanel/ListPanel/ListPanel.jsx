import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import FlipMove from 'react-flip-move';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListTypes from '../../../../constants/list';
import Colors from '../../../../constants/colors';
// import './ListPanel.scss';

const useStyle = makeStyles((theme) => ({
  list: {
    display: 'flex',
    alignItems: 'start',
    paddingLeft: 15,
    paddingRight: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: 'white',
  },

  todo: {
    borderLeftColor: Colors.todo,
    borderRightColor: Colors.todo,
    '&:hover': {
      backgroundColor: Colors.hover,
    },
    '&$selected': {
      backgroundColor: Colors.todoSelected,
      '&:hover': {
        backgroundColor: Colors.todoSelected,
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
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    color: 'rgba(255, 255, 255, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(0.4vh + 0.4vw + 15px)',
  },

  deleteListButton: {
    height: '100%',
  },

  endDiv: {
    height: 100,
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
          <IconButton
            className={styleClasses.deleteListButton}
            onClick={() => props.onClickDelete(list.id)}
          >
            <CloseIcon />
          </IconButton>
        </ListItem>
      ))
    );
  };

  return (
    <div className="list-panel">
      <FlipMove
        delay={50}
        duration={105}
        appearAnimation="fade"
      >
        {generateLists()}
        <div className={styleClasses.endDiv} />
      </FlipMove>
    </div>
  );
}

ListPanel.propTypes = {
  lists: PropTypes.arrayOf(Object).isRequired,
  onChangeList: PropTypes.func.isRequired,
  selectedList: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};
