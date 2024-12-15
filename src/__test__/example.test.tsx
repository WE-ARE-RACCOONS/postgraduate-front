import { render, screen, renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplyWantedSeniorPage from '@/app/apply-wanted-senior/page';
import mockRouter from 'next-router-mock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

const newQueryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
});

describe('원하는 선배 페이지 초기 화면', () => {
  beforeEach(async () => {
    mockRouter.push('/');
  });

  it('멘토링을 원하는 선배에 대해 알려주세요', async () => {
    render(
      <QueryClientProvider client={newQueryClient}>
        <Suspense>
          <ApplyWantedSeniorPage />
        </Suspense>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: '멘토링을 원하는 선배에 대해 알려주세요',
      });
      expect(heading).toBeInTheDocument();
    });
  });
});
