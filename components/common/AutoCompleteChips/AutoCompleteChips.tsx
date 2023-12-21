import { FC, useCallback, useEffect } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { useSelectItems } from './useSelectItems';
import type { AutoCompleteChipsProps, IChip } from './interfaces';
import { Chip } from '../Chip';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';

export const AutoCompleteChips: FC<AutoCompleteChipsProps> = ({
  items,
  onSearch,
}) => {
  const {
    filteredItems,
    selectedItems,
    selectedItemsIndexed,
    filterMode,
    onSearchItems,
    onSelectItem,
    onReset,
    onFilterModeChange,
    toggleItem,
  } = useSelectItems(items);

  const ItemTemplate = (item: IChip) => <Chip name={item.name} icon={item.icon} />;
  const SelectedItemTemplate = (item: IChip) => (
    <Chip name={item.name} icon={item.icon} />
  );

  useEffect(() => {
    onSearch(selectedItems,filterMode);
  }, [selectedItems, onSearch, filterMode]);

  return (
    <div className='autocomplete-selector'>
      <div className='hidden md:flex gap-2 flex-wrap'>
        {items.map(item => (
          <Chip
            key={item.name}
            name={item.name}
            icon={item.icon}
            button
            disabled={
              selectedItemsIndexed && selectedItemsIndexed[item.name]
                ? true
                : false
            }
            onClick={() => toggleItem(item)}
          />
        ))}
      </div>
      <div className='my-4'>
        <AutoComplete
          value={selectedItems}
          name='autocomplete'
          multiple
          forceSelection
          itemTemplate={ItemTemplate}
          selectedItemTemplate={SelectedItemTemplate}
          onChange={e => onSelectItem(e.value)}
          suggestions={filteredItems}
          completeMethod={onSearchItems}
        ></AutoComplete>
        <div className='flex items-center justify-between mt-2 mb-6'>
          <div className='flex gap-2 flex-col sm:flex-row'>
            <div className='flex gap-2 items-center'>
              <RadioButton
                value='can'
                name='filter-mode'
                checked={filterMode === 'can'}
                onChange={e => onFilterModeChange(e.value)}
              />
              <label>Puede Tener</label>
            </div>
            <div className='flex gap-2 items-center'>
              <RadioButton
                value='has'
                name='filter-mode'
                checked={filterMode === 'has'}
                onChange={e => onFilterModeChange(e.value)}
              />
              <label>Tiene</label>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Button type='button' label='Reiniciar Filtro' onClick={onReset} />
          </div>
        </div>
      </div>
    </div>
  );
};
