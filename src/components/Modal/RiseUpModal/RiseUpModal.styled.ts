import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 50%;
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%);
  width: 360px;
  height: 100vh;

  @keyframes modalAppear {
    from {
      top: 38rem;
      opacity: 0;
    }
    to {
      top: 7.9rem;
      opacity: 1;
    }
  }

  .rise-up-modal {
    width: inherit;
    height: 38rem;
    position: absolute;
    top: 7.9rem;
    animation: modalAppear 0.5s ease-out;
    border-radius: 1.9rem 1.9rem 0 0;
    z-index: 1;
    background-color: #fff;
  }
`;

export const TextFieldWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 3.75rem;
  left: 50%;
  transform: translateX(-50%);
`;
