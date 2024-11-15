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
  background-color: white;
  padding-top: 16px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 30px);
  gap: 10px;
  border-radius: 0 0 15px 15px;
`;
