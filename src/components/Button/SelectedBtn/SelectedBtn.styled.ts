import styled from 'styled-components';

export const StyledSelectedBtn = styled.button<{ $selected: boolean }>`
  width: max-content;
  height: 2.125rem;
  margin: 0 0.2rem;
  padding: 0.3rem 0.75rem;
  font-size: 16px;
  font-family: Pretendard;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? '#2FC4B2' : '#F8F9FA')};
  color: ${(props) => (props.$selected ? '#fff' : '#ADB5BD')};
  border: ${(props) => (props.$selected ? 'none' : '1px solid #DEE2E6')};
  font-weight: ${(props) => (props.$selected ? '700' : '400')};

  #selected-x-btn {
    width: 1rem;
    height: 1rem;
    margin-left: 0.375rem;
    cursor: pointer;
  }
`;
