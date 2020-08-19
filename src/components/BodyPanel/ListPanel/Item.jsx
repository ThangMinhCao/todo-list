import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

function Item(props) {
  return (
    <div>
      <ListItem key={props.content} button>
        <ListItemText primary={props.content} />
        <Checkbox />
      </ListItem>
      <Divider />
    </div>
  );
}

Item.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Item;
