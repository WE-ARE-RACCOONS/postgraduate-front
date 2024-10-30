import { useQuery } from '@tanstack/react-query';
import { getSeniorMentoringActiveTab } from '@/api/mentoring/getSeniorMentoringActiveTab';
import { tapType } from '@/types/tap/tap';

export const useGetSeniorMentoringActiveTabQuery = ({
  activeTab,
}: {
  activeTab: tapType;
}) => {
  return useQuery({
    queryFn: () => getSeniorMentoringActiveTab({ activeTab }),
    queryKey: [`/getSeniorMentoringActiveTab/${activeTab}`],
    suspense: true,
    useErrorBoundary: true,
  });
};
