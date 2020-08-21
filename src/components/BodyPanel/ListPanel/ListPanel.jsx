import React from 'react';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Item from './Item';
import '../BodyPanel.scss';

export default class ListPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
    };
    this.onAddContent = this.onAddContent.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onAddContent(itemID, content) {
    this.setState((prevState) => ({
      todoItems: [...prevState.todoItems,
        this.renderItem(itemID, content)],
    }));
  }

  onDeleteItem(id) {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.filter((item) => item.key !== id),
    }));
  }

  toggleFinished = (id) => {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.map(
        (item) => (item.id === id ? { ...item, checked: !item.checked } : item),
      ),
    }));
  }

  renderItem(itemID, text) {
    return (
      <Item
        id={itemID}
        deleteSelf={this.onDeleteItem}
        key={itemID}
        content={text}
        finished={false}
        onClickFinished={this.toggleFinished}
      />
    );
  }

  render() {
    return (
      <List className="list-panel">
        {this.state.todoItems}
        <Fab color="primary" className="fab-edit">
          <EditIcon />
        </Fab>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
        />
      </List>
    );
  }
}
