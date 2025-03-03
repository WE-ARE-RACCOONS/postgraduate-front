import useFunnel from '@/hooks/useFunnel';
import mockRouter from 'next-router-mock';
import { fireEvent, render, screen } from '@testing-library/react';

const MockFunnelComponent = ({
  steps,
  initalStep,
}: {
  steps: string[];
  initalStep: string;
}) => {
  const [Funnel, updateStep, prevStep] = useFunnel(steps, {
    initialStep: initalStep,
  });
  return (
    <Funnel steps={steps} step={steps[0]}>
      <Funnel.Step name={steps[0]}>
        <div>
          <h1>첫번째 컨텐츠</h1>
          <button onClick={() => updateStep(steps[1])}>다음</button>
        </div>
      </Funnel.Step>

      <Funnel.Step name={steps[1]}>
        <div>
          <h1>두번째 컨텐츠</h1>
          <button onClick={() => updateStep(steps[2])}>다음</button>
        </div>
      </Funnel.Step>
      <Funnel.Step name={steps[2]}>
        <div>
          <h1>세번째 컨텐츠</h1>
          <button onClick={prevStep}>돌아가기</button>
        </div>
      </Funnel.Step>
    </Funnel>
  );
};

describe('useFunnel훅 테스트', () => {
  const steps = ['step1', 'step2', 'step3'];
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });
  test('첫번째 Step컴포넌트가 렌더링된다', () => {
    render(<MockFunnelComponent steps={steps} initalStep="step1" />);
    expect(screen.getByText('첫번째 컨텐츠')).toBeInTheDocument();
  });

  test('다음 버튼을 누르면 두번쨰 Step으로 이동한다', () => {
    render(<MockFunnelComponent steps={steps} initalStep="step1" />);
    fireEvent.click(screen.getByText('다음'));
    mockRouter.reload();
    expect(screen.getByText('두번째 컨텐츠')).toBeInTheDocument();
  });

  test('이전 버튼을 누르면 이전 Step으로 이동한다', () => {
    render(<MockFunnelComponent steps={steps} initalStep="step3" />);
    fireEvent.click(screen.getByText('돌아가기'));
    expect(screen.getByText('두번째 컨텐츠')).toBeInTheDocument();
  });
});
