import { use, useEffect } from 'react';
import { StepperContainer, StepperTab } from './ProgressBar.styled';

function ProgressBar({
  activeNum,
  totalNum,
}: {
  activeNum: number;
  totalNum: number;
}) {
  useEffect(() => {
    const activeStepArr = document.getElementsByClassName('stepper-tab');

    for (let i = 0; i < totalNum; i++) {
      activeStepArr[i].classList.remove('active');
    }
    for (let i = 0; i <= activeNum; i++) {
      activeStepArr[i].classList.add('active');
    }
  }, [totalNum, activeNum, renderStepperTabs]);

  function renderStepperTabs(totalNum: number) {
    const stepperTabs = [];

    for (let i = 0; i < totalNum; i++) {
      stepperTabs.push(
        <StepperTab key={`stepper-tab-${i}`} $totalNum={totalNum}>
          <div id={`stepper-tab-${i}`} className="stepper-tab"></div>
        </StepperTab>,
      );
    }

    return stepperTabs;
  }

  return <StepperContainer>{renderStepperTabs(totalNum)}</StepperContainer>;
}

export default ProgressBar;
