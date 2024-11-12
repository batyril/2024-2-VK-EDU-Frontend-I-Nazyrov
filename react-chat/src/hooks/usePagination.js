import { useState } from 'react';

function usePagination(initialPage = 1, pageSize = 10) {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return {
    page,
    pageSize,
    totalPages,
    nextPage,
    previousPage,
    setTotalPages,
  };
}

export default usePagination;
