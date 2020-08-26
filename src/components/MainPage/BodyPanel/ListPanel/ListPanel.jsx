import React from 'react';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import './ListPanel.scss';

export default function ListPanel() {
  const [lists, setLists] = React.useState([]);
  const [currentList, setCurrentList] = React.useState('list1');

  const onChangeCurrentList = (event, newValue) => {
    setCurrentList(newValue);
  };

  return (
    <div className="list-panel">
      {/* <Tabs
        indicatorColor="primary"
        orientation="vertical"
        onChange={onChangeCurrentList}
        value={currentList}
        className="list-group"
      >
        <Tab value="list1" label="List 1asdasdas </br> dsadsadsadsadsadsad" />
        <Tab value="list2" label="List 2" />
      </Tabs> */}
      <List>
        <ListItem>
          asdas
        </ListItem>
      </List>
    </div>
  );
}
