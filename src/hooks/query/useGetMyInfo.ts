import { getMyInfo } from '@/api/user/info/getMyInfo';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';

export const useGetMyInfoQuery = ({ isJunior }: { isJunior: boolean }) => {
  const { getUserType } = useAuth();

  return useQuery({
    queryKey: ['myinfo'],
    queryFn: () => getMyInfo({ isJunior }),
    suspense: true,
    useErrorBoundary: true,
    enabled: getUserType() === 'junior' || getUserType() === 'senior',
  });
};
