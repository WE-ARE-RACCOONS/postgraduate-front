import styled from 'styled-components';

export const SingleValidatorContainer = styled.div<{ color?: string }>`
  color: ${(props) => props.color || 'red'};
`;
