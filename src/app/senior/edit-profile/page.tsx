import React from 'react';
import { EditForm } from './_components/EditForm';
import { ErrorBoundaryWrapper } from '@/services/ErrorBoundaryWrapper';
import { ErrorFallback } from './ErrorFallback';

const EditProfilePage = () => {
  return (
    <ErrorBoundaryWrapper
      fallbackComponent={ErrorFallback}
      suspenseFallback={<div>로딩</div>}
    >
      <EditForm />
    </ErrorBoundaryWrapper>
  );
};

export default EditProfilePage;
