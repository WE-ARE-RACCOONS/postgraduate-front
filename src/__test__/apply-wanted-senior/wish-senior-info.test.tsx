import { WishSeniorInfo } from '@/app/apply-wanted-senior/(components)/(steps)';
import { render, waitFor, screen } from '@testing-library/react';

describe('원하는 선배 신청 초기 페이지', () => {
  it('멘토링을 원하는 선배에 대해 알려주세요 문구가 렌더링된다', async () => {
    render(<WishSeniorInfo onClick={() => {}} />);
    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: '멘토링을 원하는 선배에 대해 알려주세요',
      });
      expect(heading).toBeInTheDocument();
    });

    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: /대학원 김선배가 원하는 선배를 빠르게 만날 수 있도록 도와드릴게요!/i,
      });
      expect(heading).toBeInTheDocument();
    });
  });
});
