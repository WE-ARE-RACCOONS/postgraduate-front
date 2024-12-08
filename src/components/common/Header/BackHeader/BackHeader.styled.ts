import styled from 'styled-components';

export const BackHeaderContainer = styled.div`
  width: inherit;
  height: 3.5rem;
  position: relative;

  #back-arrow-img {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    cursor: pointer;
  }

  #header-text {
    width: max-content;
    height: 1.6rem;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
