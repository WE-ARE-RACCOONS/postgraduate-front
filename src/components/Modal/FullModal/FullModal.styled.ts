import styled from "styled-components";

export const FullModalContainer = styled.div`
  width: 600px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: lemonchiffon;

  @media (max-width: 600px) {
    width: 360px;
  }
`