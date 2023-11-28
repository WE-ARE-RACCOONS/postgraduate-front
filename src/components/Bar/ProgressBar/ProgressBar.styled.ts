import styled from "styled-components"

export const StepperContainer = styled.div`
  width: 21rem;
  height: 0.5rem;
  background-color: #999;
  display: flex;

  .stepper-tab {
    width: 0rem;
    height: 0.5rem;
    background-color: #3f3f3f;
    transition: width 1s ease;
  }

  .active {
    width: 7rem;
  }
`

export const StepperTab = styled.div`
  width: 7rem;
  height: 0.5rem;
`