import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getSeniorList } from '@/api/senior/getSeinorList';

import { SeniorList } from '@/components/SeniorList';
import getQueryClient from '@/utils/getQueryClient';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['seniorList'],
    queryFn: () => getSeniorList({ field: 'all', postgradu: 'all', page: 1 }),
    staleTime: Infinity,
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

  jsonLd.itemListElement = seniorData.seniorSearchResponses.map(
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
