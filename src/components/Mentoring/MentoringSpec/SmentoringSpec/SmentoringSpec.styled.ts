import styled from 'styled-components';
interface SMCBtnProps {
  isActive?: boolean;
}

export const ModalMentoringBackground = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  z-index: 2;
  background-color: white;
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
export const ModalBottomBtn = styled.div`
  justify-content: center;
  display: flex;
`;
export const MMTop = styled.div`
  align-items: center;
  text-align: center;
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
`;
export const SMCBtn = styled.button<SMCBtnProps>`
  background-color: ${(props) => (props.isActive ? '#2FC4B2' : '#F8F9FA')};
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
`;
