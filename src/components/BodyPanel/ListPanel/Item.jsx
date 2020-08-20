import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Item.scss';

function Item(props) {
  return (
    <ListItem className="item" key={props.content}>
      <Paper className="paper" elevation={5}>
        <ListItemText
          disableTypography
          className="item-text-box"
          primary={(
            <Typography
              className="item-text"
            >
              {props.content}
            </Typography>
          )}
        />
        <Checkbox
          color="primary"
          className="item-checkbox"
          checked={props.checked}
          onChange={() => props.onClickCheckBox(props.id)}
        />
      </Paper>
    </ListItem>
  );
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClickCheckBox: PropTypes.func.isRequired,
};

export default Item;
