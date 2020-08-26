import React from 'react';
import Divider from '@material-ui/core/Divider';
import './BodyPanel.scss';
import ItemPanel from './ItemPanel/ItemPanel';
import ListPanel from './ListPanel/ListPanel';
// import AddItemField from './ListPanel/AddItemField';

class BodyPanel extends React.Component {
  constructor() {
    super();
    // this.listPanel = React.createRef();
    this.state = ({
      // todoLists: {},
    });
  }

  onAddList = (list) => {
    this.listPanel.current.onAddContent(list);
  }

  render() {
    return (
      <div className="container">
        <ListPanel />
        <Divider orientation="vertical" className="divider" />
        {/* eslint-disable-next-line no-return-assign */}
        <ItemPanel />
      </div>
    );
  }
}

BodyPanel.propTypes = {
};

export default BodyPanel;
