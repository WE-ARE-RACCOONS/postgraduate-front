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
            href={
              currentPage - displayPage >= 1
                ? `/?page=${currentPage - displayPage}`
                : `/?page=${Math.max(page - 1, 1)}`
            }
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
            isnonactive={currentPage === totalPage / SeniorListPerPageCount - 1}
            href={
              currentPage < Math.floor(totalPage / SeniorListPerPageCount) &&
              currentPage + displayPage <=
                Math.floor(totalPage / SeniorListPerPageCount) + 1
                ? `/?page=${currentPage + displayPage}`
                : `/?page=${Math.min(
                    page + 1,
                    Math.floor(totalPage / SeniorListPerPageCount) + 1,
                  )}`
            }
            aria-disabled={currentPage === totalPage - 1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
