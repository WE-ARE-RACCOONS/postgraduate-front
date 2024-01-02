import styled from 'styled-components';
interface PhoneNumContainerProps {
  flag: boolean;
}
export const PhoneNumContainer = styled.div<PhoneNumContainerProps>`
  width: 20.5rem;
  height: 1.625rem;
  display: flex;

  input {
    width: 21.4375rem;
    height: 3.1875rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 1px solid #c2cede;
    background: #fff;
    border: ${(props) =>
      props.flag ? '1px solid #FF3347' : '1px solid initial'};
  }
  #phone-num-input {
    padding: 0.3rem;
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
