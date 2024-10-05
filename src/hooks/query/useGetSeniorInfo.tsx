import { getDetailSeniorInfoFetch } from '@/api/senior/[id]/getDetailSeniorInfo';
import { useQuery } from '@tanstack/react-query';

export const useGetSeniorInfoQuery = ({ seniorId }: { seniorId: string }) => {
  return useQuery({
    queryKey: ['seniorInfo', seniorId],
    queryFn: () => getDetailSeniorInfoFetch({ seniorId }),
    suspense: true,
    useErrorBoundary: true,
  });
};
