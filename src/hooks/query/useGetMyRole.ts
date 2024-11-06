import { getUserRole } from '@/api/user/role/getUserRole';

import { useQuery } from '@tanstack/react-query';

export const useGetMyRoleQuery = () => {
  return useQuery({
    queryFn: getUserRole,
    queryKey: ['myrole'],
    useErrorBoundary: true,
    suspense: true,
  });
};
