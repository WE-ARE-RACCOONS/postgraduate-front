import styled from 'styled-components';

export const StepperContainer = styled.div`
  width: inherit;
  height: 0.5rem;
  background-color: #f8f9fa;
  display: flex;

  .stepper-tab {
    width: 0rem;
    height: 0.5rem;
    background-color: #2fc4b2;
    // transition: width 1s ease;
  }

  .active {
    width: 100%;
  }
`;

export const StepperTab = styled.div<{ $totalNum: number }>`
  width: calc(100% / ${props => props.$totalNum});
  height: 0.5rem;
`;
