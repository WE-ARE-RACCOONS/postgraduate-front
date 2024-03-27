import styled from 'styled-components';

export const NicknameTotalContainer = styled.div`
  margin-left: 0.75rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const NicknameContainer = styled.div``;
export const NameFont = styled.div`
  color: #212529;
  font-family: Noto Sans JP;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.5rem;
`;
export const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 97%;
  height: 3.1875rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 1px solid #c2cede;
  background: #fff;

  #user-nickname {
    width: 14rem;
    margin: 0.55rem 1rem;
    border: none;
    height: 2rem;
  }

  #user-nickname:focus {
    outline: none;
  }
`;

export const InputBtn = styled.button`
  border: none;
  display: inline-flex;
  width: 3.6rem;
  padding: 0.3125rem 0.725rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: #495565;
  color: #fff;
  font-family: Pretendard;
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 150% */
  letter-spacing: -0.0375rem;
  margin: 0.6rem 0.3rem;
  margin-right: 1rem;
  cursor: pointer;
`;
