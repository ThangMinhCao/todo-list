import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ButtonBase from '@material-ui/core/ButtonBase';
import RemoveIcon from '@material-ui/icons/Remove';
import './Item.scss';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content,
      finished: false,
      finishButtonClassName: 'button-first',
      textClassName: 'item-text-first',
    };

    this.onClickFinished = this.onClickFinished.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  onClickFinished() {
    this.setState((prevstate) => ({
      ...prevstate,
      finished: !prevstate.finished,
      finishButtonClassName: !prevstate.finished ? 'button-finished' : 'button-not-finished',
      textClassName: !prevstate.finished ? 'item-text-checked' : 'item-text-unchecked',
    }));
  }

  setContent(newContent) {
    this.setState((prevstate) => ({
      ...prevstate,
      content: newContent,
    }));
  }

  render() {
    return (
      <ListItem className="item" key={this.state.content}>
          <div className="button-field">
            <ButtonBase
              variant="contained"
              className={this.state.finishButtonClassName}
              // onClick={() => this.props.onClickFinished(this.props.id)}
              onClick={this.onClickFinished}
            >
              <CheckIcon className="icon" />
            </ButtonBase>
          </div>
        <Paper className="paper" elevation={5}>
          <ListItemText
            disableTypography
            className="item-text-box"
            primary={(
              <Typography
                className={this.state.textClassName}
              >
                {this.props.content === '' ? 'Empty Item' : this.props.content}
              </Typography>
            )}
          />
          <div className="end-button-field">
            <ButtonBase
              variant="contained"
              className="end-button-group"
              // onClick={() => this.props.onClickFinished(this.props.id)}
              onClick={() => this.props.deleteSelf(this.props.id)}
            >
              <RemoveIcon className="icon" />
            </ButtonBase>
          </div>
        </Paper>
      </ListItem>
    );
  }
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deleteSelf: PropTypes.func.isRequired,
};

export default Item;
