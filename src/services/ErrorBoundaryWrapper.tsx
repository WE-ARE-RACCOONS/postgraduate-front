'use client';

import { ComponentType, ReactNode, Suspense } from 'react';
import { FallbackProps } from './errorboundary';
import { ErrorBoundary } from 'react-error-boundary';

interface PropsType {
  children: React.ReactNode;
  fallbackComponent: ComponentType<FallbackProps>;
  suspenseFallback: ReactNode;
}

export const ErrorBoundaryWrapper = ({
  children,
  fallbackComponent: FallbackComponent,
  suspenseFallback: SuspenseFallback,
}: PropsType) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Suspense fallback={SuspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
