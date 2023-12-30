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
background: #2FC4B2;
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
export const MNick = styled.div`
display: flex;
color: #2FC4B2;
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.75rem */
letter-spacing: -0.03125rem;`;

export const Color = styled.div`
color: #212529;
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: 140%;
letter-spacing: -0.03125rem;`;

export const MApplyBox = styled.div`
width: 95%;
height: 5.875rem;
flex-shrink: 0;
border-radius: 1rem;
background: #F8F9FA;
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
color: #868E96;
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