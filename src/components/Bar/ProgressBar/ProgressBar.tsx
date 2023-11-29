import { useEffect } from 'react';
import { StepperContainer, StepperTab } from './ProgressBar.styled';

function ProgressBar({ activeNum }: { activeNum: number }) {
  useEffect(() => {
    const activeStep = document.getElementById(`stepper-tab-${activeNum}`);
    activeStep?.classList.add('active');
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
