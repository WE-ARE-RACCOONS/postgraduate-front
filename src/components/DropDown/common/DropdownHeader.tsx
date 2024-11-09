import { ReactNode } from 'react';
import styled from 'styled-components';

export const DropdownHeader = ({ children }: { children: ReactNode }) => {
  return <DropdownHeaderStyle>{children}</DropdownHeaderStyle>;
};

const DropdownHeaderStyle = styled.header`
  width: 100%;
  min-height: 28px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
`;
