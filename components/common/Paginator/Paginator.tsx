import { FC, useEffect, useState } from 'react';
import { Paginator as PvPaginator } from 'primereact/paginator';
import { PaginatorProps } from './interfaces';


export const Paginator: FC<PaginatorProps> = ({
  itemsPerPage,
	totalRecords,
  onPaginate,
}) => {
	const [first, setFirst] = useState(0);

  const handlePageChange = event => {
    const first: number = event.first;
    onPaginate(first);
    setFirst(first);
  };

  useEffect(() => {
    onPaginate(0);
  }, [onPaginate]);

  return (
    <PvPaginator
      first={first}
      rows={itemsPerPage}
      totalRecords={totalRecords}
      onPageChange={handlePageChange}
    />
  );
};
