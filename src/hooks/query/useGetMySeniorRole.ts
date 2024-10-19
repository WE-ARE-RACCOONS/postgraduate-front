import { useQuery } from '@tanstack/react-query';
import { getSeniorRole } from '@/api/user/role/getSeniorRole';

export const useGetMySeniorRole = () => {
  return useQuery({
    queryKey: ['mySeniorRole'],
    queryFn: getSeniorRole,
    useErrorBoundary: true,
    suspense: true,
  });
};
