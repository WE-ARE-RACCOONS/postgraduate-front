import styled from 'styled-components';

export const MentoringCancelBox = styled.div`
  border: 1px solid black;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 255px; // 반응형 처리 따로 필요
  height: 200px;
  z-index: 2;
  background-color: white;

  @media (min-width: 360px) and (max-width: 600px) {
    width: 360px;
  }
`;
export const CancelBtn = styled.button``;
export const NoCancelBtn = styled.button``;
