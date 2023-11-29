import styled from 'styled-components';

export const AuthLabeledContainer = styled.div`
  width: max-content;
  height: 1.5rem;
  display: flex;
  position: relative;

  #auth-labeled-str {
    width: max-content;
    height: 1.5rem;
    line-height: 1.5rem;
    margin-right: 1.5rem;
  }

  #auth-mark-icon {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;
