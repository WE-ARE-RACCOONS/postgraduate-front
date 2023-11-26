import styled from "styled-components";

export const StyledSelectedBtn = styled.button<{ $selected: boolean }>`
  width: max-content;
  height: 1.5rem;
  margin: 0 0.5rem;
  padding: 0 0.5rem;
  background-color: ${props => props.$selected ? '#000' : ''};
  color: ${props => props.$selected ? '#fff' : ''};
`