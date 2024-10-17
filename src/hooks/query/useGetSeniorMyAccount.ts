import { useQuery } from '@tanstack/react-query';

import { getSenoirMyAccount } from '@/api/user/info/getMyAccountFetch';

export const useGetSeniorMyAccountQuery = () => {
  return useQuery({
    queryKey: ['getSeniorMyAccount'],
    queryFn: getSenoirMyAccount,
    staleTime: Infinity,
    useErrorBoundary: true,
    suspense: true,
  });
};
