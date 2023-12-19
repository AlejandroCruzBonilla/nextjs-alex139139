import { FC } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { useSelectItems } from './useSelectItems';
import type { AutoCompleteChipsProps } from './interfaces';
import { Chip } from '../Chip';

export const AutoCompleteChips: FC<AutoCompleteChipsProps> = ({ items }) => {
  const { filteredItems, selectedItems, onSearchItems, onSelectItem, onReset } =
    useSelectItems(items);

  const onSubmit = event => {
    event.preventDefault();
  };

  const ItemTemplate = item => <Chip name={item.name} icon={item.icon} />;
  const SelectedItemTemplate = item => <Chip name={item.name} icon={item.icon} />;

  return (
    <div className='autocomplete-selector'>
      <form onSubmit={onSubmit}>
        <AutoComplete
          value={selectedItems}
          dropdown
          multiple
          forceSelection
          itemTemplate={ItemTemplate}
          selectedItemTemplate={SelectedItemTemplate}
          onChange={e => onSelectItem(e.value)}
          suggestions={filteredItems}
          completeMethod={onSearchItems}
        ></AutoComplete>
      </form>
    </div>
  );
};
