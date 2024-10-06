import { Hydrate, QueryClient, dehydrate } from '@tanstack/react-query';
import { getSeniorList } from '@/api/senior/getSeinorList';
import { SeniorList } from '@/components/SeniorList';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['seniorList'],
    queryFn: () => getSeniorList({ field: 'all', postgradu: 'all', page: 1 }),
    getNextPageParam: (lastPage) =>
      lastPage.data.seniorSearchResponses.length + 1,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Person',
        position: 1,
        item: {
          '@type': 'Person',
          name: 'Senior 1',
          description: 'Description of Senior 1',
        },
      },
    ],
  };

  const seniorData = await queryClient.fetchQuery({
    queryKey: ['seniorList'],
    queryFn: () => getSeniorList({ field: 'all', postgradu: 'all', page: 1 }),
  });

  jsonLd.itemListElement = seniorData.data.seniorSearchResponses.map(
    (senior, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: senior.nickName,
        description: [senior.keyword, senior.lab, senior.professor].join(', '),
        image: senior.profile,
      },
    }),
  );

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeniorList />
    </Hydrate>
  );
}
