import { useQuery } from '@tanstack/react-query';
import { getSeniorList } from '@/api/senior/getSeinorList';

export const useGetSeniorListQuery = (
  field: string,
  postgradu: string,
  page: number,
) => {
  return useQuery({
    suspense: true,
    useErrorBoundary: true,
    queryKey: ['seniorList', field, postgradu, page],
    queryFn: () => getSeniorList({ field, postgradu, page }),
    staleTime: Infinity,
  });
};
