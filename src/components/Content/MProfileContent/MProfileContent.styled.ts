import styled from 'styled-components';

export const MProfileContainer = styled.div`
  width: 16rem;
  height: 12rem;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  text-align: center;

  #profile-cancle-ask-msg {
    font-size: 1.25rem;
    font-weight: 600;
    white-space: pre;
    line-height: 130%;
  }

  #profile-guide-msg {
    width: max-content;
    height: 3rem;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #868e96;
    text-align: center;
    font-family: Noto Sans JP;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.4rem */
  }

  #x-icon {
    width: 1.32rem;
    height: 1.32rem;
    position: absolute;
    top: 2.375rem;
    right: 0.875rem;
    cursor: pointer;
  }
`;

export const MProfileBtn = styled.button`
  width: 18.5rem;
  height: 4rem;
  border: 0;
  border-radius: 0.75rem;
  background-color: #2fc4b2;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  position: absolute;
  top: 11rem;
  left: 1rem;
  font-family: Pretendard;
  cursor: pointer;
`;
