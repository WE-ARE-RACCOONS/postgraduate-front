'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const ErrorMessage = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2fc4b2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2fc4b2;
  }
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorContainer>
      <ErrorMessage>멘토 정보를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      <RetryButton onClick={() => reset()}>다시 시도</RetryButton>
      <RetryButton onClick={() => router.push('/')}>
        홈으로 돌아가기
      </RetryButton>
    </ErrorContainer>
  );
}
