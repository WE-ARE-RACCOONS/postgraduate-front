import { getSeniorMentoringList } from '@/api/mentoring/getSeniorMentoringList';

import { useQuery } from '@tanstack/react-query';

export const useGetSeniorMentoringListQuery = ({
  mentoringId,
}: {
  mentoringId: number;
}) => {
  return useQuery({
    queryFn: () => getSeniorMentoringList({ mentoringId }),
    queryKey: [`/getSeniorMentoringList/${mentoringId}`],
    enabled: mentoringId !== 0,
    useErrorBoundary: true,
    suspense: true,
  });
};
