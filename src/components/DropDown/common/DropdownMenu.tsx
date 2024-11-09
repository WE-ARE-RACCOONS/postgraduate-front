import styled from 'styled-components';
import { ReactNode } from 'react';
import { useDropdownContext } from './useDropdown';
import { DropdownItem } from './DropdownItem';
import React from 'react';
export const DropdownList = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) {
    return null;
  }

  return (
    <ListContainer>
      {React.Children.map(children, (child, index) => (
        <DropdownItem key={index} id={index + ''}>
          {child}
        </DropdownItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  background-color: #f8f9fb;
  min-height: 231px;
  width: 100%;
  padding: 8px;
  display: flex;
  gap: 16px;
  z-index: 1;
  flex-wrap: wrap;
`;
