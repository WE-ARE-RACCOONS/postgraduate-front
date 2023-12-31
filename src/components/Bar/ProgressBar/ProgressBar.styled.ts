import styled from 'styled-components';

export const StepperContainer = styled.div`
  width: inherit;
  height: 0.5rem;
  background-color: #F8F9FA;
  display: flex;

  .stepper-tab {
    width: 0rem;
    height: 0.5rem;
    background-color: #2FC4B2;
    transition: width 1s ease;
  }

  .active {
    width: 100%;
  }
`;

export const StepperTab = styled.div`
  width: 33%;
  height: 0.5rem;
`;
