import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: inherit;
  height: 100%;

  @keyframes modalAppear {
    from {
      transform: translateY(50%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes modalDisappear {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  .rise-up-modal {
    width: inherit;
    height: 31.75rem;
    position: absolute;
    top: 13.25rem;
    animation: modalAppear 0.5s ease-out;
    background-color: yellowgreen;
  }
`

export const ModalContainer = styled.div`
  @keyframes modalAppear {
    from {
      transform: translateY(50%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes modalDisappear {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  width: 22.5rem;
  height: 31.75rem;
  position: fixed;
  top: 13.25rem;
  animation: modalAppear 0.5s ease-out;
  background-color: yellowgreen;
`