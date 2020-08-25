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
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import './Item.scss';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editting: false,
      content: this.props.content,
      finished: false,
      finishButtonClassName: 'button-first',
      textClassName: 'item-text-first',
      endButtonsCollapsed: true,
      newContent: '',
    };

    this.onClickFinished = this.onClickFinished.bind(this);
    this.setContent = this.setContent.bind(this);
    this.onClickExpandEndButton = this.onClickExpandEndButton.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this);
    this.onFinishedDialog = this.onFinishedDialog.bind(this);
  }

  onClickEdit() {
    this.setState({
      editting: true,
      endButtonsCollapsed: true,
    });
  }

  onClickExpandEndButton() {
    this.setState((prevstate) => ({
      endButtonsCollapsed: !prevstate.endButtonsCollapsed,
    }));
  }

  onClickFinished() {
    this.setState((prevstate) => ({
      finished: !prevstate.finished,
      finishButtonClassName: !prevstate.finished ? 'button-finished' : 'button-not-finished',
      textClassName: !prevstate.finished ? 'item-text-checked' : 'item-text-unchecked',
    }));
    this.props.toggleFinished(this.props.id);
  }

  onFinishedDialog() {
    this.setContent(this.state.newContent);
    this.handleCloseEditDialog();
  }

  setContent(newContent) {
    if (newContent === '') {
      this.props.toggleEmptyAlert();
    } else {
      this.setState({
        content: newContent,
      });
    }
  }

  handleCloseEditDialog() {
    this.setState({
      editting: false,
    });
  }

  handleNewContent(content) {
    this.setState({
      newContent: content,
    });
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
                {this.state.content === '' ? 'Empty Item' : this.state.content}
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
              onClick={this.onClickEdit}
              // onClick={this.callAPI}
            >
              <EditIcon
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

        <Dialog
          maxWidth="sm"
          fullWidth
          onClose={this.handleCloseEditDialog}
          open={this.state.editting}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">Edit Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              rowsMax={5}
              rows={5}
              label="New content"
              defaultValue={this.state.content}
              onChange={(event) => { this.handleNewContent(event.target.value); }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onFinishedDialog} color="primary">
              Finished
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  }
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deleteSelf: PropTypes.func.isRequired,
  toggleFinished: PropTypes.func.isRequired,
  toggleEmptyAlert: PropTypes.func.isRequired,
};

export default Item;
