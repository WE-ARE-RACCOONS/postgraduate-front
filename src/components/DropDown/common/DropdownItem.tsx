import styled from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';
interface DropdownItem extends ComponentPropsWithoutRef<'li'> {
  isActive?: boolean;
}

export const DropdownItem = ({
  children,
  isActive = false,
  ...rest
}: DropdownItem) => {
  return (
    <DropdownItemStyles
      aria-selected={isActive}
      role={'menuitem'}
      isActive={isActive}
      {...rest}
    >
      {children}
    </DropdownItemStyles>
  );
};

const DropdownItemStyles = styled.li<{ isActive: boolean }>`
  padding-left: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 700;
  color: ${({ isActive }) => (isActive ? '#4C4D4E' : '#A6ABB0')};
  &:hover {
    color: '#4C4d4E';
  }
`;
