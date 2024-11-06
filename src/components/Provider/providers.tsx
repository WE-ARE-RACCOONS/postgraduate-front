'use client';
import Image from 'next/image';
import ArrowRight from '../../../public/right_white.png';
import ArrowLeft from '../../../public/left_white.png';
import { TourProvider } from '@reactour/tour';
import { Provider as JotaiProvider } from 'jotai';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface StepTextProps {
  size?: string;
  margin?: string;
  bold?: boolean;
}

const StepText = styled.p<StepTextProps>`
  font-size: ${({ size }) => size || '14px'};
  margin: ${({ margin }) => margin || '0'};
  font-weight: ${({ bold }) => (bold ? '600' : 'normal')};
  line-height: 20px;
  color: #ffffff;
  padding: 0;
`;
const tourSteps = [
  {
    selector: '.tutorial_major',
    content: (
      <div>
        <StepText size="14px">대학원 김선배에 있는</StepText>
        <StepText size="14px">모든 선배들을 확인할 수 있어요.</StepText>
        <StepText size="16px" margin={'5px 0'} bold>
          선배 전공분야 확인
        </StepText>
      </div>
    ),
    position: 'top' as const,
  },
  {
    selector: '.tutorial_school',
    content: (
      <div>
        <StepText size="16px" margin="5px 0" bold>
          선배 학교 확인
        </StepText>
        <StepText size="14px">대학원 김선배에 있는</StepText>
        <StepText size="14px">모든 선배들을 확인할 수 있어요.</StepText>
      </div>
    ),
    position: 'right' as const,
  },
  {
    selector: '.tutorial_card',
    content: (
      <div>
        <StepText size="16px" margin="5px 0" bold>
          선배 프로필
        </StepText>
        <StepText size="14px">
          내가 원하는 선배가 어떤 것을 연구하는지,
        </StepText>
        <StepText size="14px">보다 자세한 정보를 확인할 수 있어요.</StepText>
      </div>
    ),
    position: 'bottom' as const,
  },
  {
    selector: '.tutorial_mentoring',
    content: (
      <div>
        <StepText size="14px">내가 진행하거나</StepText>
        <StepText size="14px">진행한 멘토링을 확인할 수 있어요.</StepText>
        <StepText size="16px" margin="5px 0" bold>
          내 멘토링
        </StepText>
      </div>
    ),
    position: 'top' as const,
  },
];

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <TourProvider
          position={'top'}
          showNavigation
          scrollSmooth
          styles={{
            close: (base) => ({
              ...base,
              color: '#ffffff',
            }),
            popover: (base) => ({
              ...base,
              color: '#2fc4b2',
              background: 'none',
              boxShadow: 'none',
              '--reactour-accent': '#2FC4B2',
            }),
            maskWrapper: (base) => ({
              ...base,
              background: 'none',
            }),
            controls: (base) => ({
              ...base,
              background: 'none',
            }),
            badge: (base) => ({
              ...base,
              opacity: 0,
            }),
            dot: (base) => ({
              ...base,
            }),
            button: (base) => ({
              ...base,
              color: '#ffffff',
              svg: '#ffffff',
              stroke: '#ffffff',
            }),
            maskRect: (base) => ({
              ...base,
              background: 'none',
            }),
          }}
          disableKeyboardNavigation
          steps={tourSteps}
          nextButton={(props) => (
            <Image
              src={ArrowRight}
              alt="튜토리얼_다음버튼"
              width={30}
              height={30}
              onClick={() => props.setCurrentStep(props.currentStep + 1)}
              style={{
                cursor: 'pointer',
              }}
              {...props}
            />
          )}
          prevButton={(props) => (
            <Image
              src={ArrowLeft}
              alt="튜토리얼_이전버튼"
              width={30}
              height={30}
              onClick={() => props.setCurrentStep(props.currentStep - 1)}
              style={{
                cursor: 'pointer',
              }}
              {...props}
            />
          )}
        >
          {children}
        </TourProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
