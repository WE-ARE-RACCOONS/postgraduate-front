import { useQuery } from '@tanstack/react-query';
import { tapType } from '@/types/tap/tap';
import { getMyMentoringActiveTab } from '@/api/mentoring/getMyMentoringActiveTab';

export const useGetMyMentoringActiveTabQuery = ({
  activeTab,
}: {
  activeTab: tapType;
}) => {
  return useQuery({
    queryFn: () => getMyMentoringActiveTab({ activeTab }),
    queryKey: [`/getMyMentoringActiveTab/${activeTab}`],
    suspense: true,
    useErrorBoundary: true,
  });
};
