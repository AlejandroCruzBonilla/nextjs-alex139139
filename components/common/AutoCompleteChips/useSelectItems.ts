import { useEffect, useState } from 'react';
import type { IChip, IndexedChip, FilterMode } from './interfaces';

export const useSelectItems = (items: IChip[]) => {
  const [selectedItems, setSelectedItems] = useState<IChip[]>([]);
  const [filteredItems, setFilteredItems] = useState<IChip[]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>('can');

  const [selectedItemsIndexed, setSelectedItemsIndexed] = useState<IndexedChip>(
    {}
  );

  const onSearchItems = event => {
    const query = event.query.trim().replaceAll(' ', '');
    const filteredItems = items.filter(item => {
      const regex = new RegExp(query, 'i');

      if (
        !selectedItemsIndexed[item.name] &&
        (!query.length || item.name.match(regex))
      ) {
        return item;
      }
    });
    setFilteredItems(filteredItems);
  };

  const onSelectItem = (items: IChip[]) => {
    setSelectedItems([...items]);
  };

  const toggleItem = (item: IChip) => {
    const selectedItem = selectedItemsIndexed[item.name];
    if (selectedItem)
      setSelectedItems(selectedItems.filter(sItem => sItem.name !== item.name));
    else setSelectedItems([...selectedItems, item]);
  };

  const onReset = () => {
    setSelectedItems([]);
  };

  const onFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
  };

  useEffect(() => {
    const indexedItems = selectedItems.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    setSelectedItemsIndexed(indexedItems as IndexedChip);
  }, [selectedItems]);

  return {
    filteredItems,
    selectedItems,
    selectedItemsIndexed,
    filterMode,

    //Methods
    onSearchItems,
    onSelectItem,
    toggleItem,
    onReset,
    onFilterModeChange,
  };
};
