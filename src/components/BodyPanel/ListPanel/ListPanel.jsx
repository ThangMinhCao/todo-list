import React from 'react';
import List from '@material-ui/core/List';
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';

export default class ListPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItemContents: ['123124', 'hello'],
    };
    this.onAddContent = this.onAddContent.bind(this);
  }

  onAddContent(content) {
    this.setState((prevState) => ({
      todoItemContents: [...prevState.todoItemContents, content],
    }));
  }

  render() {
    return (
      <List className="list">
        {this.state.todoItemContents.map((value) => (
          <Item id={value} key={uuidv4()} content={value} />
        ))}
      </List>
    );
  }
}
