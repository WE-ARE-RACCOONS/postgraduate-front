import styled from 'styled-components';

export const SalaryBoxContainer = styled.div`
  width: 93%;
  height: 4.7rem;
  border-radius: 0.25rem;
  border: 1px solid #f1f3f5;
  background-color: #f8f9fa;
  display: flex;
  margin-left: 1rem;
  #middle {
    width: 0rem;
    height: 3.18rem;
    flex-shrink: 0;
    border: 1px solid #dee2e6;
    margin-top: 1rem;
  }

  #left {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  #right {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

export const SalaryBlock = styled.div`
  width: 9.2rem;
  height: 4rem;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const SalaryDesc = styled.div`
  width: max-content;
  height: 1.25rem;
  color: #212529;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.225rem */
  letter-spacing: -0.03125rem;
`;

export const SalaryValue = styled.div`
  width: max-content;
  height: 1.25rem;
  color: #2fc4b2;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.575rem */
  letter-spacing: -0.03125rem;
`;

export const InfoMark = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid #495565;
  border-radius: 50%;
  font-size: 10px;
  cursor: pointer;
`