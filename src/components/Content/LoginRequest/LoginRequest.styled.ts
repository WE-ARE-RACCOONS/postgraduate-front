import styled from 'styled-components';

export const LoginRequestBox = styled.div`
  position: absolute;
  text-align: center;
  margin-left: 1.5rem;
  margin-top: 0.3rem;
  #Login-guide-msg{
    color: #333;
text-align: center;
font-family: Noto Sans JP;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: 130%; /* 1.625rem */
  }

  #Login-guide-suggest{
    color: #868E96;
text-align: center;
font-family: Noto Sans JP;
font-size: 1.0625rem;
font-style: normal;
font-weight: 400;
line-height: 140%; 
margin-top: 0.8rem;
  }
`;

export const LoginRequestBoxTop = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;
export const LoginRequestBtn = styled.button`
margin-top: 1.5rem;
 display: inline-flex;
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