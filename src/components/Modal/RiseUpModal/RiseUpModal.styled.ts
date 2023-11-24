import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 600px; // 반응형 처리 따로 필요
  height: 100vh;
  z-index: 2;

  @media (min-width: 360px) and (max-width: 600px) {
    width: 360px;
  }

  @keyframes modalAppear {
    from {
      top: 45rem;
      opacity: 0;
    }
    to {
      top: 13.25rem;
      opacity: 1;
    }
  }

  .rise-up-modal {
    width: inherit;
    height: 31.75rem;
    position: absolute;
    top: 13.25rem;
    animation: modalAppear 0.5s ease-out;
    border-radius: 1.9rem 1.9rem 0 0;
    border: 1px solid #000;
    z-index: 1;
    background-color: #fff;
  }
`

export const TextFieldWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 3.75rem;
  left: 50%;
  transform: translateX(-50%);
`