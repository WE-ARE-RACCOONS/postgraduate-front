import styled from 'styled-components';

export const ProfileFormContainer = styled.div<{ $flag: boolean }>`
  width: inherit;
  height: max-content;
  margin-left: 1rem;
  margin-top: 1.56rem;

  #single-profile-form {
    height: 4.125rem;
    width: 94%;
    border-radius: 0.25rem;
    border: 1px solid ${(props) => (props.$flag ? '#FF5757' : '#DFDFDF')};
    padding: 0.5rem;
    resize: none;
    font-family: Pretendard;
    font-size: 16px;
    &::placeholder {
      color: #adb5bd;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem;
      letter-spacing: -0.0375rem;
    }
  }

  #multi-profile-form {
    height: 11.875rem;
    width: 94%;
    resize: none;
    border-radius: 0.25rem;
    border: 1px solid ${(props) => (props.$flag ? '#FF5757' : '#DFDFDF')};
    padding: 0.5rem;
    font-family: Pretendard;
    font-size: 16px;

    &::placeholder {
      color: #adb5bd;
      font-family: Pretendard;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem;
      letter-spacing: -0.0375rem;
    }
  }
`;

export const ProfileTitleContainer = styled.div`
  width: 94%;
  height: 1.4rem;
  color: #212529;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; /* 100% */
  letter-spacing: -0.0375rem;
  margin-bottom: 0.31rem;
  display: flex;
  justify-content: space-between;
  #char-count {
    color: #868e96;
    text-align: justify;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.125rem;
    letter-spacing: -0.0375rem;
  }
`;
