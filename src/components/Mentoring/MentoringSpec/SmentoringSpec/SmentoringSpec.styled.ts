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
  #mmtop{
    color: #212529;
text-align: center;
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.75rem */
letter-spacing: -0.03125rem;
  }
  #mentoring-back{
    border-radius: 1rem;
background: #F8F9FA;
margin: 1rem;
  }
`;
export const ModalClose = styled.button``;
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
#header-text{
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
`
