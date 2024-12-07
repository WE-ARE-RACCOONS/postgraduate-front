import styled from 'styled-components';
export const NotSeniorBoxTop = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const NotSeniorMid = styled.div`
  align-items: center;
  text-align: center;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 2rem;
  font-family: Pretendard;
`;
export const NotSeniorBottom = styled.div`
  position: absolute;
  bottom: 1.87rem;
  left: 5%;
`;
export const NSMain = styled.div`
  width: 12.6rem;
  color: #333;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 1.625rem */
`;
export const NSSub = styled.div`
  color: #868e96;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
`;
export const NSBtn = styled.button`
  display: flex;
  margin-left: 0.5rem;
  width: 18rem;
  padding: 1rem 3.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #2fc4b2;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
