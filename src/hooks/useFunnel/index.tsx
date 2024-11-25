import { ReactElement, ReactNode, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Funnel from './Funnel';

type StepArray = Readonly<string[]>;

export interface FunnelProps<Steps extends StepArray> {
  steps: Steps;
  step: Steps[number];
  children: ReactElement | Array<ReactElement>;
}

interface StepProps<Steps extends StepArray> {
  name: Steps[number];
  children: ReactNode;
}

interface RouteFunnel<Steps extends StepArray> {
  (_props: FunnelProps<Steps>): ReactElement;
}

interface RouterFunnelStep<Steps extends StepArray> {
  (_props: StepProps<Steps>): ReactElement;
}

interface FunnelOptions<Steps extends StepArray> {
  initialStep?: Steps[number];
  stepQueryKey?: string;
  stepChangeType?: 'push' | 'replace';
}

function useFunnel<Steps extends StepArray>(
  steps: Steps,
  options: FunnelOptions<Steps> = {
    initialStep: steps[0],
    stepChangeType: 'push',
  },
): [
  RouteFunnel<Steps> & { Step: RouterFunnelStep<Steps> },
  (step: Steps[number]) => void,
  () => void,
  string,
] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getCurrentStep = () => {
    return (
      searchParams.get(options.stepQueryKey as string) ?? options.initialStep
    );
  };

  const [currentStep, setCurrentStep] = useState(() => getCurrentStep());
  const activeStepIndex = steps.findIndex((s) => s === currentStep);

  const updateStep = (step: Steps[number]) => {
    setCurrentStep(step);
    const searchParam = new URLSearchParams(searchParams);
    searchParam.set(options.stepQueryKey ?? 'step', step);
    if (options.stepChangeType === 'push') router.push(`?${searchParam}`);
    else {
      router.replace(`?${searchParam}`);
    }
  };

  const prevStep = () => {
    if (currentStep && activeStepIndex > 0) {
      updateStep(steps[activeStepIndex - 1]);
    } else {
      router.back();
    }
  };

  const FunnelComponent: RouteFunnel<Steps> = (props) => {
    return (
      <Funnel steps={steps} step={steps[activeStepIndex]}>
        {props.children}
      </Funnel>
    );
  };

  const Step: RouterFunnelStep<Steps> = ({ name, children }) => {
    if (name === currentStep) {
      return <>{children}</>;
    }
    return <></>;
  };

  return [
    Object.assign(FunnelComponent, { Step }),
    updateStep,
    prevStep,
    currentStep ?? options.initialStep,
  ];
}

export default useFunnel;
