import styled from 'styled-components';

export const PhoneNumContainer = styled.div`
  display: flex;

  input {
    border: 1px solid #c2cede;
    width: 97%;
    height: 3.1875rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background: #fff;
  }

  input:focus {
    outline: none;
  }
`;

export const NumFont = styled.div`
  color: #212529;
  font-family: Noto Sans JP;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.5rem;
`;
