import React from 'react';
import Divider from '@material-ui/core/Divider';
import './BodyPanel.scss';
import ListPanel from './ItemPanel/ListPanel';
// import AddItemField from './ListPanel/AddItemField';

class BodyPanel extends React.Component {
  constructor() {
    super();
    // this.listPanel = React.createRef();
    this.state = ({
      todoLists: {},
    });
  }

  onAddList = (list) => {
    this.listPanel.current.onAddContent(list);
  }

  render() {
    return (
      <div className="container">
        <div className="feature-panel">
          {/* eslint-disable-next-line react/jsx-no-bind */}
          {/* <AddItemField addTodoItem={this.onAddItem} /> */}
        </div>
        <Divider orientation="vertical" className="divider" />
        {/* eslint-disable-next-line no-return-assign */}
        <ListPanel />
      </div>
    );
  }
}

BodyPanel.propTypes = {
};

export default BodyPanel;
