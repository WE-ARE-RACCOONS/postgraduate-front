import { ReactNode } from 'react';
import styled from 'styled-components';

export const DropdownHeader = ({ children }: { children: ReactNode }) => {
  return <DropdownHeaderStyle>{children}</DropdownHeaderStyle>;
};

const DropdownHeaderStyle = styled.header`
  min-height: 28px;
  color: #a6abb0;
  display: flex;
  justify-content: space-between;
`;
