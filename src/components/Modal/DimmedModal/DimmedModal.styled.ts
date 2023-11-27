import styled from "styled-components";

export const DimmedBgContainer = styled.div`
  width: 600px;
  @media (min-width: 360px) and (max-width: 600px) {
    width: 360px;
  }
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(39, 39, 39, 0.48);
`

export const DimmedMdContainer = styled.div`
  width: 19rem;
  height: 17rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
`