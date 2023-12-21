import styled from 'styled-components';
interface TapStyleProps {
  selected: boolean;
}

export const TapStyle = styled.div<TapStyleProps>`
  width: 4.9rem;
  height: 3.37rem;
  align-items: center;
  justify-content: center;
display: flex;
color: #495565;
font-weight: 700;
border-bottom: ${({ selected }) => (selected ? '2px solid #495565' : 'none')};
color: ${({ selected }) => (selected ? '#495565' : '#C2CEDE')};
`;
