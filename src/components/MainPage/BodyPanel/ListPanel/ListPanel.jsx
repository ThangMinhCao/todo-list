import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import ListTypes from '../../../../constants/list';
import Colors from '../../../../constants/colors';
// import './ListPanel.scss';

const useStyle = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingLeft: 15,
    borderLeft: '5px solid',
    borderRight: '2px solid',
  },

  todo: {
    borderColor: Colors.todo,
    '&$selected': {
      backgroundColor: Colors.todoSelected,
      '&:hover': {
        backgroundColor: Colors.todoHover,
      },
    },
  },

  reminders: {
    borderColor: Colors.reminders,
    '&$selected': {
      backgroundColor: Colors.remindersSelected,
      '&:hover': {
        backgroundColor: Colors.reminderHover,
      },
    },
  },

  schedule: {
    borderColor: Colors.schedule,
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

  itemDivider: {
    height: '0.3px',
  },
});

export default function ListPanel(props) {
  const styleClasses = useStyle();
  const { lists, onChangeList, selectedList } = props;

  const listComponents = () => {
    return (
      lists.map((list) => (
        <ListItem
          button
          classes={{
            root: styleClasses.list,
            selected: styleClasses.selected,
          }}
          className={`${styleClasses.list} ${styleClasses.schedule}`}
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
          <Divider className={styleClasses.itemDivider} />
        </ListItem>
      ))
    );
  };

  return (
    <div className="list-panel">
      <List>
        <Divider className={styleClasses.itemDivider} />
        {listComponents()}
      </List>
    </div>
  );
}

ListPanel.propTypes = {
  lists: PropTypes.arrayOf(Object).isRequired,
  onChangeList: PropTypes.func.isRequired,
  selectedList: PropTypes.string.isRequired,
};
