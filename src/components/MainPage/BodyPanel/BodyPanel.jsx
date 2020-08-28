import React from 'react';
import Divider from '@material-ui/core/Divider';
import { v4 as uuidv4 } from 'uuid';
import './BodyPanel.scss';
import ItemPanel from './ItemPanel/ItemPanel';
import ListPanel from './ListPanel/ListPanel';
// import AddItemField from './ListPanel/AddItemField';

export default function BodyPanel() {
  const [lists, setLists] = React.useState([{ id: 'list1', name: 'List 1' }]);

  const onAddList = (listName, listType) => {
    const listID = uuidv4();
    setLists([...lists, { id: listID, name: listName, type: listType }]);
  };

  return (
    <>
      <ListPanel lists={lists} />
      <Divider orientation="vertical" className="divider" />
      <ItemPanel />
    </>
  );
}

BodyPanel.propTypes = {
};
