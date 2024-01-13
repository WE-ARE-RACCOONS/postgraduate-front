import styled from 'styled-components';

export const FullModalContainer = styled.div`
  width: 600px;
  height: 100%;
  position: fixed;
overflow-y: scroll;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;

  @media (max-width: 600px) {
    width: 360px;
    overflow-y: scroll;
    height: 100%;
  }
`;
