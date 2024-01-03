import styled from 'styled-components';
export const MyLoginRequestBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  #x-icon {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
`;
export const MLBoxTop = styled.div`
  display: flex;
  padding: 1rem;
`;
export const MLBoxMiddle = styled.div`
align-items: center;
display: flex;
justify-content: center;
`;
export const Logo = styled.div`
  display: flex;
  .none-name {
    font-size: 1.3rem;
  }
  .bold-name {
    font-size: 1.3rem;
    font-weight: 700;
  }
  
`;
export const MLBoxBottom = styled.div`
margin-left: 1.5rem;
#mylogin-req-msg{
  color: #212529;
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 400;
line-height: 120%; /* 1.5rem */
letter-spacing: -0.03125rem;
}
#mylogin-req-msg-bold{
  color: #212529;
font-family: Pretendard;
font-size: 1.5rem;
font-style: normal;
font-weight: 700;
line-height: 120%;
letter-spacing: -0.03125rem;
}
#mylogin-req-msg-large{
  margin-bottom: 1rem;
  display: flex;
  color: #212529;
font-family: Pretendard;
font-size: 1.5rem;
font-style: normal;
font-weight: 400;
line-height: 120%;
letter-spacing: -0.03125rem;
}
#mylogin-req-msg-color{
  color: #2FC4B2;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 1.4rem */
letter-spacing: -0.03125rem;
}
#mylogin-req-msg-small{
  display: flex;
  color: #868E96;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: 140%;
letter-spacing: -0.03125rem;
}
`;
