import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 50%;
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%);
  width: 360px;
  height: 100vh;
  z-index: 2;

  @keyframes modalAppear {
    from {
      top: 30rem;
      opacity: 0;
    }
    to {
      top: 18.6rem;
      opacity: 1;
    }
  }

  .short-rise-up-modal {
    width: inherit;
    height: 18rem;
    position: absolute;
    top: 18.6rem;
    animation: modalAppear 0.5s ease-out;
    border-radius: 1.9rem 1.9rem 0 0;
    z-index: 1;
    background-color: #fff;
  }
`;