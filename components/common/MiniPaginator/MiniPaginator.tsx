import { FC, useEffect, useState } from 'react';
import { Paginator as PvPaginator } from 'primereact/paginator';
import { MiniPaginatorProps } from './interfaces';

export const MiniPaginator: FC<MiniPaginatorProps> = ({
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

	useEffect(() => {
    setFirst(0);
  }, [totalRecords]);

  return (
    <PvPaginator
      first={first}
      rows={itemsPerPage}
      totalRecords={totalRecords}
      onPageChange={handlePageChange}
      template={{ layout: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink' }}
    />
  );
};
