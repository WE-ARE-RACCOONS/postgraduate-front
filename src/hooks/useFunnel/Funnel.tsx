import { Children, ReactElement, ReactNode, isValidElement } from 'react';
export interface FunnelProps<Steps extends StepArray> {
  steps: Steps;
  step: Steps[number];
  children: ReactElement | Array<ReactElement>;
}

interface StepProps<Steps extends StepArray> {
  children: ReactNode;
  name: string;
  onEnter?: () => void;
}
type StepArray = Readonly<string[]>;
function Funnel<Steps extends StepArray>({
  step,
  steps,
  children,
}: FunnelProps<Steps>): ReactElement {
  const targetStep = Children.toArray(children)
    .filter(isValidElement<StepProps<Steps>>)
    .filter((i) => steps.includes(i.props.name ?? ''));

  const target = targetStep.find((child) => child.props.name === step);

  return <>{target}</>;
}

Funnel.Step = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
export default Funnel;
