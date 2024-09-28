'use client';

import React from 'react';
import { FallbackProps } from 'react-error-boundary';

//TODO: 후에 수정 필요
export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  console.log('error', error);
  return (
    <div role="alert">
      <h2>오류가 발생했습니다</h2>
      <p>죄송합니다. 문제가 발생했습니다:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
};
