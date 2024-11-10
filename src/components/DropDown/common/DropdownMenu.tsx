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

const ListContainer = styled.ul`
  background-color: #f8f9fb;
  min-height: 135px;
  padding-top: 16px;
  gap: 32px;
  list-style-type: none;
  display: flex;
  position: absoulute;
  top: 2px;
  left: 2px;
  z-index: 1;
  flex-wrap: wrap;
  border-radius: 0 0 15px 15px;
`;
