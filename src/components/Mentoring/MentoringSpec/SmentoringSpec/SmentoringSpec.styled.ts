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
export const ModalClose = styled.button``;