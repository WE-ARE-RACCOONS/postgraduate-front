import styled from 'styled-components';

export const StyledSelectedBtn = styled.button<{ $selected: boolean }>`
  min-width: 60px;
  width: auto;
  height: 2.25rem;
  margin: 0.25rem 0.5rem 0.25rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 16px;
  font-family: Pretendard;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$selected ? '#2FC4B2' : 'rgba(124, 143, 141, 0.1)'};
  color: ${(props) => (props.$selected ? '#fff' : '#4C4D4E')};
  border: ${(props) => (props.$selected ? '1px solid #21B1A0' : '1px #D7D7D7')};
  font-weight: ${(props) => (props.$selected ? '700' : '400')};

  #selected-x-btn {
    width: 1rem;
    height: 1rem;
    margin-left: 0.15rem;
    margin-bottom: 0.15rem;
    cursor: pointer;
    vertical-align: middle;
  }
`;
