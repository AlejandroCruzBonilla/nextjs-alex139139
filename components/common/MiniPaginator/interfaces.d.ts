export interface MiniPaginatorProps {
  itemsPerPage: number;
  totalRecords: number;
  onPaginate: (first: number) => void;
}
