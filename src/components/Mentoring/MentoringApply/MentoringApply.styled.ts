import styled from 'styled-components';

export const ConfirmBox = styled.div``;
export const DateDone = styled.div`
  display: flex;
  color: #495565;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.4rem */
  letter-spacing: -0.03125rem;
`;
export const ConfirmContent = styled.div<{ isJunior: boolean }>`
  width: 100%;
  height: 5.8rem;
  ${(props) => props.isJunior && 'border-bottom: 1px solid #dee2e6;'}
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
`;
export const DateExpect = styled.div`
  display: flex;
  color: #2fc4b2;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.4rem */
  letter-spacing: -0.03125rem;
`;
export const Color = styled.div`
  color: #495565;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.03125rem;
`;
export const ConfirmProfile = styled.img`
  width: 3.375rem;
  height: 3.375rem;
  border-radius: 90%;
`;
export const MRFont = styled.div`
  color: #495565;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
export const RemainFont = styled.div`
  color: #ff5757;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.05rem */
`;
export const ConfirmTitle = styled.div`
  color: #212529;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.225rem */
`;
export const UserInfo = styled.div`
  color: #495565;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.05rem */
`;
export const ConfirmInfo = styled.div`
  margin-left: 0.94rem;
`;
export const ConfirmState = styled.div`
  height: 1.375rem;
  padding: 0.0625rem 0.5rem;
  align-items: center;
  border-radius: 6.25rem;
  border: 1px solid #2fc4b2;
  background: #fff;
  color: #2fc4b2;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 180% */
  letter-spacing: -0.0375rem;
`;
export const ConfirmShow = styled.div`
  border: 1px solid black;
`;
