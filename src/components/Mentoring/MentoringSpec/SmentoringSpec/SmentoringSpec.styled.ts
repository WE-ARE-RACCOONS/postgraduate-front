import styled from 'styled-components';
export const ConfirmProfile = styled.img`
  width: 3.375rem;
  height: 3.375rem;
  border-radius: 90%;
`;
export const ConfirmInfo = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  margin-left: 0.94rem;
`;
export const TermBox = styled.div`
  margin-left: 2rem;
  margin-top: 1rem;
  display: inline-flex;
  height: 1.375rem;
  padding: 0.0625rem 0.5rem;
  align-items: center;
  flex-shrink: 0;
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
export const ConfirmTitle = styled.div`
  width: 7rem;
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
export const ModalMentoringBackground = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  #mmtop {
    color: #212529;
    text-align: center;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.75rem */
    letter-spacing: -0.03125rem;
  }
  #mentoring-back {
    border-radius: 1rem;
    background: #f8f9fa;
    margin: 1rem;
  }
  #mentoring-topic {
    color: #212529;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1rem; /* 114.286% */
    letter-spacing: -0.0375rem;
    margin-left: 1rem;
    margin-bottom: 0.38rem;
  }
  #mentoring-time-msg {
    color: #868e96;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem; /* 114.286% */
    letter-spacing: -0.0375rem;
    margin-bottom: 0.38rem;
    margin-bottom: 0.5rem;
  }
`;
export const ModalClose = styled.button`
  display: flex;
  width: 10.87144rem;
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
  border: none;
`;
export const ModalNClose = styled.button`
  display: flex;
  width: 10.87144rem;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #dee2e6;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
`;
export const ModalBottomBtn = styled.div`
  justify-content: center;
  display: flex;
  margin-bottom: 7rem;
  margin-top: 3rem;
`;
export const MMTop = styled.div`
  align-items: center;
  display: flex;
  width: inherit;
  height: 3.5rem;
  #header-text {
    color: #212529;
    text-align: center;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.75rem */
    letter-spacing: -0.03125rem;
    margin-left: 35%;
  }
  #img {
    text-align: center;
    margin-left: 91%;
    position: absolute;
  }
`;
export const SMCBtn = styled.button`
  border-radius: 0.25rem;
  display: flex;
  height: 2.5rem;
  width: 91%;
  margin-left: 1rem;
  padding: 0.5rem 0.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border: none;
  margin-bottom: 0.37rem;
  cursor: pointer;
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
export const ConfirmContent = styled.div`
  width: 100%;
  height: 5.8rem;
  padding: 1.2rem;
  display: flex;
`;
export const SMSDate = styled.div`
  display: flex;
  height: 2.5rem;
  width: 92%;
  padding: 0.5rem 0.75rem;
  display: flex;
  border-radius: 0.25rem;
  background: #f8f9fa;
  margin-left: 1rem;
`;
export const ServiceMsg = styled.div`
  margin-top: 3rem;
  color: #868e96;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.225rem */
`;
export const WarnMsg = styled.div`
  margin-left: 1rem;
  color: #f16464;
  font-family: Noto Sans JP;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
