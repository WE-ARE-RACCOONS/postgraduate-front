import styled from 'styled-components';

export const SingleValidatorContainer = styled.div<{ color?: string }>`
  color: ${(props) => props.color || '#FF5757'};
  font-size: 12px;
  display: flex;
  line-height: 12px;
  margin-top: 8px;
  #alert-x-img {
    width: 0.625rem;
    height: 0.625rem;
    margin-right: 0.2rem;
  }
`;
