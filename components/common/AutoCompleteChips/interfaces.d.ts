export interface AutoCompleteChipsProps {
  items: IChip[];
  onSearch: (items: IChip[], filterMode: FilterMode) => void;
}

export interface IChip {
  icon?: string;
  name?: string;
}

export type FilterMode = 'can' | 'has'

export type IndexedChip = { [key: string]: IChip };