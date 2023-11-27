import styled from 'styled-components';

export const MProfileContainer = styled.div`
  width: 16rem;
  height: 16rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  #profile-guide-msg {
    width: 12.5rem;
    height: 3.7rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #x-icon {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 2.375rem;
    right: 0.875rem;
    cursor: pointer;
  }

  #btn-styled-wrapper {
    width: 6.4rem;
    height: 1.4rem;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;
