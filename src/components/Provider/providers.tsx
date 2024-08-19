'use client';

import { TourProvider } from '@reactour/tour';
import { Provider as JotaiProvider } from 'jotai';

const tourSteps = [
  {
    selector: '.first-step',
    content: 'This is my first-step',
  },
];
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <TourProvider steps={tourSteps}>{children}</TourProvider>
    </JotaiProvider>
  );
}
