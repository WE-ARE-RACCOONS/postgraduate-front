import styled from 'styled-components';

export const MProfileContainer = styled.div`
  width: 16rem;
  height: 12rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  text-align: center;

  #profile-guide-msg {
    width: 12.5rem;
    height: 3rem;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #868E96;
text-align: center;
font-family: Noto Sans JP;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 1.4rem */
  }

  #x-icon {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 2.375rem;
    right: 0.875rem;
    cursor: pointer;
  }

`;
