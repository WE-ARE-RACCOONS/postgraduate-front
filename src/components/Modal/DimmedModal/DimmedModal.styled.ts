import styled from 'styled-components';

export const DimmedBgContainer = styled.div`
  width: 100%;
  @media (min-width: 360px) and (max-width: 600px) {
    width: 360px;
  }
  height: 100%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  background-color: rgba(39, 39, 39, 0.48);
`;

export const DimmedMdContainer = styled.div`
  width: 20.5rem;
  min-height: 16.125rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 1rem;
  background: #fff;
`;
