import { useEffect } from 'react';
import { StepperContainer, StepperTab } from './ProgressBar.styled';

function ProgressBar({ activeNum }: { activeNum: number }) {
  useEffect(() => {
    const activeStepArr = [];
    for(let i = 0; i <= activeNum; i++) {
      const activeStep = document.getElementById(`stepper-tab-${activeNum}`);
      activeStepArr.push(activeStep);
    }
    if(activeStepArr.length > 0) {
      activeStepArr.forEach((el) => {
        el?.classList.add('active');
      })
    }
  }, []);

  return (
    <StepperContainer>
      <StepperTab>
        <div id="stepper-tab-0" className="stepper-tab"></div>
      </StepperTab>
      <StepperTab>
        <div id="stepper-tab-1" className="stepper-tab"></div>
      </StepperTab>
      <StepperTab>
        <div id="stepper-tab-2" className="stepper-tab"></div>
      </StepperTab>
    </StepperContainer>
  );
}

export default ProgressBar;
