import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import TranslateIcon from '@material-ui/icons/Translate';
import Tooltip from '@material-ui/core/Tooltip';
import translate from '../../../api/translate';
import '../BodyPanel.scss';

export default class AddItemField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoContent: '',
      loading: false,
      translating: false,
    };
    this.translateText = this.translateText.bind(this);
  }

  onAddItem = async () => {
    if (this.state.translating && this.state.todoContent) {
      await this.translateText();
    }
    this.props.addTodoItem(this.state.todoContent);
    this.onClearAddField();
  }

  onSubmitContent = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      this.onAddItem();
    }
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

  onToggleLoading = () => {
    this.setState((prevstate) => ({
      loading: !prevstate.loading,
    }));
  }

  onToggleTranslating = () => {
    this.setState((prevstate) => ({
      translating: !prevstate.translating,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  async translateText() {
    try {
      // await this.onToggleLoading();
      this.onToggleLoading();
      this.props.onLoading();
      const response = await translate.get('/text/translate',
        {
          params: {
            source: 'en',
            target: 'vi',
            // eslint-disable-next-line react/no-access-state-in-setstate
            input: this.state.todoContent,
          },
        });
      this.onToggleLoading();
      this.setState({
        todoContent: response.data.outputs[0].output,
      });
      this.props.onLoading();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  // async getSupportedLanguages() {
  //   try {
  //     const response = await
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  render() {
    return (
      <div style={{ width: '100vw' }}>
        <Paper className="add-item-field" elevation={8}>
          <IconButton
            className="button"
            color="primary"
            aria-label="directions"
            onClick={this.onAddItem}
            disabled={this.state.loading}
          >
            <AddIcon />
          </IconButton>
          <InputBase
            type="form"
            rows={4}
            rowsMax={4}
            color="primary"
            className="input"
            placeholder="Enter item's content (Click '+' button or Ctrl+Enter to add)"
            multiline
            value={this.state.todoContent}
            onChange={this.handleTextFieldChange}
            onSubmit={this.onSubmitContent}
            onKeyDown={this.onSubmitContent}
          />
          <Tooltip arrow title={this.state.translating ? 'Translation on add enabled' : 'Translation on add disabled'}>
            <IconButton
              className="button"
              color="primary"
              aria-label="directions"
              // onClick={this.state.todoContent !== '' ? this.translateText : null}
              onClick={this.onToggleTranslating}
            >
              <TranslateIcon color={this.state.translating ? 'primary' : 'disabled'} />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Clear text field">
            <IconButton
              className="button"
              color="primary"
              aria-label="directions"
              onClick={this.onClearAddField}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </div>
    );
  }
}

AddItemField.propTypes = {
  addTodoItem: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired,
};
