import styled from 'styled-components';

export const SalaryBoxContainer = styled.div`
  width: 93%;
  height: 4.7rem;
  border-radius: 0.25rem;
border: 1px solid #F1F3F5;
  background-color: #F8F9FA;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 1rem;
  #middle{
    width: 0rem;
height: 3.18rem;
flex-shrink: 0;
border: 1px solid #DEE2E6;
  }
`;

export const SalaryBlock = styled.div`
display: flex;
flex-direction: column;
text-align: center;
  justify-content: center;
  align-items: center;
  width: 9.2rem;
  height: 4rem;
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
  color: #2FC4B2;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.575rem */
letter-spacing: -0.03125rem;
`;
