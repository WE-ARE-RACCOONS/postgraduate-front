import styled from 'styled-components';

export const ModalMentoringBackground = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 600px; // 반응형 처리 따로 필요
  height: 100vh;
  z-index: 2;
  background-color: white;

  @media (min-width: 360px) and (max-width: 600px) {
    width: 360px;
  }
`;
export const ModalClose = styled.button`
  display: flex;
  width: 92%;
  border: none;
  margin: 0.94rem 1rem;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #2fc4b2;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const MNick = styled.div`
  display: flex;
  color: #2fc4b2;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.75rem */
  letter-spacing: -0.03125rem;
`;
export const ConfirmProfile = styled.img`
  width: 3.375rem;
  height: 3.375rem;
  border-radius: 90%;
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
export const ConfirmInfo = styled.div`
  width: 63%;
  margin-left: 0.94rem;
`;
export const ConfirmContent = styled.div`
  width: 100%;
  height: 5.8rem;
  padding: 1.2rem;
  display: flex;
`;
export const Color = styled.div`
  color: #212529;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.03125rem;
`;

export const MApplyBox = styled.div`
  width: 95%;
  height: 5.875rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #f8f9fa;
  justify-content: center;
  margin-left: 0.6rem;
`;
export const MMainFont = styled.div`
  color: #212529;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; /* 114.286% */
  letter-spacing: -0.0375rem;
`;
export const MsubFont = styled.div`
  color: #868e96;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 114.286% */
  letter-spacing: -0.0375rem;
`;
export const Mmargin = styled.div`
  margin-top: 1.5rem;
  margin-left: 1rem;
`;
