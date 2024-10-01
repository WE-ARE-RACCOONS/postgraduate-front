import { useInfiniteQuery } from '@tanstack/react-query';
import { getSeniorList } from '@/api/senior/getSeinorList';

export const useGetSeniorListQuery = (field: string, postgradu: string) => {
  return useInfiniteQuery({
    suspense: true,
    queryKey: ['seniorList', field, postgradu],
    queryFn: ({ pageParam = 1 }) =>
      getSeniorList({ field, postgradu, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.data.data.totalElements;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
};
