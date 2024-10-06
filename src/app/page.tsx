import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getSeniorList } from '@/api/senior/getSeinorList';
import { SeniorList } from '@/components/SeniorList';
import getQueryClient from '@/utils/getQueryClient';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['seniorList'],
    queryFn: () => getSeniorList({ field: 'all', postgradu: 'all', page: 1 }),
    getNextPageParam: (lastPage) =>
      lastPage.data.seniorSearchResponses.length + 1,
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <SeniorList />
    </Hydrate>
  );
}
