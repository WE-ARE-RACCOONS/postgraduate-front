import styled from 'styled-components';

export const MentoringCancelBox = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 19rem;
height: 17.6875rem;
  z-index: 2;
  background-color: white;

  @media (min-width: 360px) and (max-width: 600px) {
    width: 360px;
  }
`;
export const CancelBtn = styled.button``;
export const NoCancelBtn = styled.button`
display: flex;
width: 18.4375rem;
padding: 1rem 5.8125rem;
justify-content: center;
align-items: center;
gap: 0.625rem;
border-radius: 0.75rem;
background: #2FC4B2;
border: none;
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
