import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import '../BodyPanel.scss';

export default class AddItemField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoContent: '',
    };
    this.onClickAdd = props.addTodoItem;
  }

  onAddItem = () => {
    this.onClickAdd(this.state.todoContent === '' ? 'Empty item' : this.state.todoContent);
    this.onClearAddField();
  }

  handleTextFieldChange = (value) => {
    this.setState({
      todoContent: value.target.value,
    });
  }

  onClearAddField = () => {
    this.setState({
      todoContent: '',
    });
  }

  render() {
    return (
      <Paper className="add-item-field" elevation={3}>
        <InputBase
          color="primary"
          rows={5}
          rowsMax={5}
          className="input"
          placeholder="Add new Todo Item"
          multiline
          value={this.state.todoContent}
          onChange={this.handleTextFieldChange}
        />
        <IconButton
          className="button"
          color="primary"
          aria-label="directions"
          onClick={this.onAddItem}
        >
          <AddIcon />
        </IconButton>
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