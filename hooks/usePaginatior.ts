import { useEffect, useState } from 'react';

interface UsePaginatorOptions<T> {
  itemsPerPage: number;
  items: T[];
}

export const usePaginator = <T>({
  itemsPerPage,
  items,
}: UsePaginatorOptions<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setPaginatedItems(items.slice(startIndex, endIndex));
    setTotalPages(items.length / itemsPerPage);
  }, [currentPage, items, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    totalPages,
  };
};
