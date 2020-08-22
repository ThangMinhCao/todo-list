import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './Item.scss';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content,
      finished: false,
      finishButtonClassName: 'button-first',
      textClassName: 'item-text-first',
      endButtonsCollapsed: true,
    };

    this.onClickFinished = this.onClickFinished.bind(this);
    this.setContent = this.setContent.bind(this);
    this.onClickExpandEndButton = this.onClickExpandEndButton.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickEdit() {
    this.setState((prevstate) => ({
      ...prevstate,
      endButtonsCollapsed: true,
    }));
  }

  onClickExpandEndButton() {
    this.setState((prevstate) => ({
      ...prevstate,
      endButtonsCollapsed: !prevstate.endButtonsCollapsed,
    }));
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
        <Paper className="paper" elevation={3}>
          <div className="button-field">
            <ButtonBase
              className={this.state.finishButtonClassName}
              // onClick={() => this.props.onClickFinished(this.props.id)}
              onClick={this.onClickFinished}
            >
              <CheckIcon className="icon" />
            </ButtonBase>
          </div>
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
              className={
                this.state.endButtonsCollapsed
                  ? 'modify-button-collapsed'
                  : 'modify-button'
              }
              // className="modify-button"
              // onClick={() => this.props.deleteSelf(this.props.id)}
            >
              <EditIcon
                onClick={this.onClickEdit}
                className={
                  this.state.endButtonsCollapsed
                    ? 'edit-icon-collapsed'
                    : 'edit-icon'
                }
              />
            </ButtonBase>
            <ButtonBase
              className={
                this.state.endButtonsCollapsed
                  ? 'delete-button-collapsed'
                  : 'delete-button'
              }
              onClick={() => this.props.deleteSelf(this.props.id)}
            >
              <DeleteOutlineIcon
                className={this.state.endButtonsCollapsed
                  ? 'delete-icon-collapsed'
                  : 'delete-icon'}
              />
            </ButtonBase>
          </div>
          <div className="expand-button-field">
            <ButtonBase
              className="expand-button"
              onClick={this.onClickExpandEndButton}
            >
              {
                this.state.endButtonsCollapsed
                  ? <ArrowLeftIcon className="expand-icon" />
                  : <ArrowRightIcon className="expand-icon" />
              }
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
