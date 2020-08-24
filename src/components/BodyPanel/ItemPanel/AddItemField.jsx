import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../BodyPanel.scss';

export default class AddItemField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoContent: '',
      snackBarOpened: false,
    };
    this.onClickAdd = props.addTodoItem;
  }

  onAddItem = () => {
    if (this.state.todoContent) {
      this.onClickAdd(this.state.todoContent);
      this.onClearAddField();
    } else {
      this.toggleSnackbar();
    }
  }

  handleTextFieldChange = (value) => {
    this.setState({
      todoContent: value.target.value,
    });
  }

  toggleSnackbar = () => {
    this.setState((prevstate) => ({
      ...prevstate,
      snackBarOpened: !prevstate.snackBarOpened,
    }));
    // console.log(this.state.snackBarOpened)
  }

  onClearAddField = () => {
    this.setState({
      todoContent: '',
    });
  }

  render() {
    return (
      <Paper className="add-item-field" elevation={8}>
        <Snackbar
          open={this.state.snackBarOpened}
          message="Please insert the item's content"
          onClose={this.toggleSnackbar}
          autoHideDuration={1500}
        >
          <MuiAlert severity="error">Empty content!</MuiAlert>
        </Snackbar>
        <IconButton
          className="button"
          color="primary"
          aria-label="directions"
          onClick={this.onAddItem}
        >
          <AddIcon />
        </IconButton>
        <InputBase
          rows={4}
          rowsMax={4}
          color="primary"
          className="input"
          placeholder="Enter item content"
          multiline
          value={this.state.todoContent}
          onChange={this.handleTextFieldChange}
        />
        <IconButton
          className="button"
          color="primary"
          aria-label="directions"
          onClick={this.onClearAddField}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    );
  }
}

AddItemField.propTypes = {
  addTodoItem: PropTypes.func.isRequired,
};
