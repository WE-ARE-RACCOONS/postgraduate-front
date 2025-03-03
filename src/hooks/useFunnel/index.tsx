import { useBackEffect } from '../useBackEffect';
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
}

function useFunnel<Steps extends StepArray>(
  steps: Steps,
  options: FunnelOptions<Steps> = {
    initialStep: steps[0],
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
    router.push(`?${searchParam}`);
  };

  const prevStep = () => {
    if (activeStepIndex <= 0) {
      router.push('/');
    } else {
      setCurrentStep(steps[activeStepIndex - 1]);
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

  useBackEffect({ callback: () => prevStep(), dependency: [currentStep] });

  return [
    Object.assign(FunnelComponent, { Step }),
    updateStep,
    prevStep,
    currentStep ?? '',
  ];
}

export default useFunnel;
