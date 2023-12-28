import styled from 'styled-components';

interface TapStyleProps {
  selected: boolean;
}
export const TapStyle = styled.div<TapStyleProps>`
  border: 1px solid #2fc4b2;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 0.6rem;
  font-weight: 700;
  font-size: 0.87rem;
  box-shadow: 0px 0px 4px 0px rgba(73, 85, 101, 0.20);
  border: ${({ selected }) => (selected ? '1px solid #2FC4B2': '1px solid #DEE2E6')};
  color: ${({ selected }) => (selected ? '#2fc4b2' : '#DEE2E6')};
`;
