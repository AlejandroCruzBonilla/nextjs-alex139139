export interface PaginatorProps {
  itemsPerPage: number;
  totalRecords: number;
  onPaginate: (first: number) => void;
}
