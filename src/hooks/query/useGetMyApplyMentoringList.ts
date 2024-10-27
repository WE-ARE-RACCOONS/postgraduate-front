import { getMyApplyMentoringList } from '@/api/mentoring/getMyApplyMentoringList';
import { useQuery } from '@tanstack/react-query';

export const useGetMyApplyMentoringListQuery = ({
  mentoringId,
}: {
  mentoringId: number;
}) => {
  return useQuery({
    suspense: true,
    useErrorBoundary: true,
    queryFn: () => getMyApplyMentoringList(mentoringId),
    queryKey: [`/getMyApplyMentoringList/${mentoringId}`],
  });
};
