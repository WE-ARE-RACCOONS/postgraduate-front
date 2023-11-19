import styled from "styled-components";

export const TypeBtnIcon = styled.button<{ $choice: boolean }>`
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 50%;
  border: ${props => props.$choice ? '1px solid black' : '0'};
`