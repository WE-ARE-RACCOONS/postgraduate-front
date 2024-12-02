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
import { SeniorListPerPageCount } from '../SeniorProfile/constant';

interface SeniorListPaginationProps {
  totalPage: number;
  displayPage?: number;
}

export function SeniorListPagination({
  totalPage,
  displayPage = 5,
  ...props
}: SeniorListPaginationProps & HTMLAttributes<HTMLDivElement>) {
  const { page, setPage } = useSeniorListPageSearchParams();

  if (totalPage <= 0) {
    return null;
  }

  const currentPage = Math.max(1, Math.min(page, totalPage));

  const handlePrev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setPage(currentPage + 1);
    }
  };

  const startPage = Math.max(
    1,
    Math.floor((currentPage - 1) / displayPage) * displayPage + 1,
  );

  const endPage = Math.min(
    startPage + displayPage - 1,
    totalPage / SeniorListPerPageCount + 1,
  );
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <Pagination aria-label="Pagination" {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrev
            isnonactive={currentPage === 1}
            aria-disabled={currentPage === 1}
            href={currentPage === 1 ? '/?page=1' : `/?page=${currentPage - 1}`}
            onClick={handlePrev}
          />
        </PaginationItem>
        {pages.map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              href={`/?page=${i}`}
              onClick={() => setPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            isnonactive={currentPage === totalPage}
            href={
              currentPage < totalPage
                ? `/?page=${currentPage + 1}`
                : `/?page=${page}`
            }
            aria-disabled={currentPage === totalPage}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
