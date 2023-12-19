import { useState } from 'react';

export const useSelectItems = items => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const onSearchItems = event => {
    const query = event.query.trim().replaceAll(' ', '');
    const filteredItems = items.filter(item => {
      if (
        !query.length &&
        !selectedItems.find(selectedItem => selectedItem.name === item.name)
      ) {
        return item;
      }
      const regex = new RegExp(query, 'i');
      if (
        item.name.match(regex) &&
        !selectedItems.find(selectedItem => selectedItem.name === item.name)
      ) {
        return item;
      }
    });
    setFilteredItems(filteredItems);
  };

  const onSelectItem = items => {
    setSelectedItems([...items]);
  };

  const onReset = () => {
    setSelectedItems([]);
  };

  return {
    filteredItems,
    selectedItems,

    //Methods
    onSearchItems,
    onSelectItem,
    onReset,
  };
};
