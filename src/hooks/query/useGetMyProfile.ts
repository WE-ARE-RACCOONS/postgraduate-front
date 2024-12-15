import { userInfoFetch } from '@/api/user/info/useInfoFetch';
import { useQuery } from '@tanstack/react-query';

export const useGetMyProfileQuery = () => {
  return useQuery({
    queryFn: userInfoFetch,
    queryKey: ['/user/me/info'],
  });
};
