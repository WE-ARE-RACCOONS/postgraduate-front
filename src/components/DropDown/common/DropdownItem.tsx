import styled from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { useDescendats } from '@/hooks/useDescendant';
import { useDecendant } from '@/hooks/useDescendant';
interface DropdownItem extends ComponentPropsWithoutRef<'li'> {}

export const DropdownItem = ({ children, ...rest }: DropdownItem) => {
  const { map } = useDescendats();
  const id = useDecendant();
  const isActive = map.current[id]?.enabled;
  return (
    <DropdownItemStyles isActive={isActive} {...rest}>
      {children}
    </DropdownItemStyles>
  );
};

const DropdownItemStyles = styled.li<{ isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  padding: 8px 12px;
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)}
  &:hover {
    color: ${({ isActive }) => (isActive ? '#4C4d4e' : '#A6ABB0')};
  }
`;
