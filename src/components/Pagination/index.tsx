import React, { ReactNode } from 'react';
import './index.css';
import Link, { LinkProps } from 'next/link';

interface PaginationProps extends React.ComponentProps<'nav'> {}

const Pagination = ({ ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`pagination ${props.className}`}
    {...props}
  />
);

Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>((props, ref) => (
  <ul
    ref={ref}
    className={`pagination-content ${props.className}`}
    {...props}
  />
));

PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>((props, ref) => <li ref={ref} style={{}} {...props}></li>);

PaginationItem.displayName = 'PaginationItem';

interface PaginationLinkProps extends LinkProps {
  isActive?: boolean;
  children?: ReactNode;
}

const PaginationLink = ({ isActive, ...props }: PaginationLinkProps) => (
  <Link
    aria-label="Go to Page"
    className={`pagination-link ${isActive ? 'active' : ''}`}
    aria-current={isActive ? 'page' : undefined}
    {...props}
  >
    {props.children}
  </Link>
);

PaginationLink.displayName = 'PaginationLink';

const PaginationPrev = ({
  isnonactive,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  isnonactive: boolean;
}) => (
  <PaginationLink {...props}>
    <svg
      focusable="false"
      aria-label="이전 페이지"
      viewBox="0 0 24 24"
      data-testid="NavigateBeforeIcon"
    >
      <path
        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
        fill={`${isnonactive ? '#D6D7D8' : '#4C4D4E'}`}
      ></path>
    </svg>
  </PaginationLink>
);

PaginationPrev.displayName = 'PaginationPrevButton';

const PaginationNext = ({
  isnonactive = false,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  isnonactive: boolean;
}) => (
  <PaginationLink {...props}>
    <svg
      focusable="false"
      aria-label="다음 페이지"
      viewBox="0 0 24 24"
      data-testid="NavigateNextIcon"
    >
      <path
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
        fill={`${isnonactive ? '#D6D7D8' : '#4C4D4E'}`}
      ></path>
    </svg>
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNextPageButton';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrev,
};
