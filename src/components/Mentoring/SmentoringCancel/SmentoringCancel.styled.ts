import styled from 'styled-components';
export const SMCancelTop = styled.div`
  margin-left: 1rem;
  margin-bottom: 1.12rem;
  margin-top: 0.5rem;
  #refusewarn {
    color: #868e96;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
  }
`;
export const SMCancelMid = styled.div``;
export const SMCBtn = styled.button`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  border: none;
  width: 18.5rem;
  height: 3.1875rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: #f8f9fa;
  margin-left: 1rem;
  padding: 0.81rem 0.75rem;
`;
export const SMCBtnEtc = styled.button`
  align-items: center;
  border: none;
  width: 18.5rem;
  height: 6.25rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: #f8f9fa;
  margin-left: 1rem;
  padding: 0.81rem 0.75rem;
`;
export const SModalMentoringBackground = styled.div`
  justify-content: center;
  position: fixed;
  border-radius: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20.5rem;
  height: 28.5rem;

  background-color: white;

  @media (min-width: 360px) and (max-width: 600px) {
    width: 20.5rem;
  }
`;
export const SMCBgContainer = styled.div`
  width: 100%;
  @media (min-width: 360px) and (max-width: 600px) {
    width: 360px;
  }
  height: 100%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  background-color: rgba(39, 39, 39, 0.48);
`;
export const SMCbtnCancelT = styled.button`
  border: none;
  border-radius: 0.75rem;
  background: #2fc4b2;
  display: flex;
  width: 17.65294rem;
  padding: 1rem 5.8125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const SMCbtnCancelF = styled.button`
  border-radius: 0.75rem;
  background: #dee2e6;
  display: flex;
  width: 17.65294rem;
  padding: 1rem 5.8125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
`;
