import styled from 'styled-components';

export const TypeBtnIcon = styled.button`
  border: none;
  cursor: pointer;
`;
export const TypeBtnIconBox = styled.div<{ $choice: boolean }>`
  margin-top: 4.19rem;
  margin-right: 0.5rem;
  width: 10rem;
  height: 13rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #f8f9fa;
  border: ${(props) => (props.$choice ? ' 2px solid #9F6DF0' : '0')};
  justify-content: center;
  text-align: center;
  align-items: 'center';
  cursor: pointer;
`;

export const TypeBtnFont = styled.div`
  padding: 0.4rem;
  color: #212529;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.575rem */
  letter-spacing: -0.03125rem;
  #tb-color {
    color: #2fc4b2;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: -0.03125rem;
  }
`;
