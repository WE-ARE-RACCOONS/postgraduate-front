'use client';

import { useSession } from 'next-auth/react';

import { useSeniorProfileQuery } from '@/services/senior/me/useSeniorProfileQuery';

const TestPage = () => {
  const { data: userData } = useSession();
  const { data } = useSeniorProfileQuery();

  console.log('useQuery호출', data);
  console.log('세션', userData);

  return <>{data?.field}</>;
};

export default TestPage;
