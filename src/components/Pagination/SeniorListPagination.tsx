import { useSeniorListPageSearchParams } from '@/hooks/search-params/useSeniorListSearchParams';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrev,
} from '.';

import type { HTMLAttributes } from 'react';

interface SeniorListPaginationProps {
  totalPage: number;
  displayPage?: number;
}

export function SeniorListPagination({
  totalPage,
  ...props
}: SeniorListPaginationProps & HTMLAttributes<HTMLDivElement>) {
  const { page, setPage } = useSeniorListPageSearchParams();
  const handlePrev = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleNext = () => {
    if (page === totalPage) {
      return;
    }
    setPage(page + 1);
  };

  const displayPage = 5;

  const startPage = Math.max(
    1,
    Math.floor((page - 1) / displayPage) * displayPage + 1,
  );

  const endPage = Math.min(startPage + displayPage - 1, totalPage);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <Pagination aria-label="Pagination" {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrev
            aria-disabled={page === 1}
            href={page === 1 ? '/?page=1' : `/?page=${page - 1}`}
            onClick={handlePrev}
          />
        </PaginationItem>
        {pages.map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={page === i}
              href={`/?page=${i}`}
              onClick={() => setPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`/?page=${page + 1}`}
            aria-disabled={page === 1}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
