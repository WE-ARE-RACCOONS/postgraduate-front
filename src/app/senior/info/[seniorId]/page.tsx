import { Hydrate, QueryClient, dehydrate } from '@tanstack/react-query';
import { SeniorInfoPage } from '@/app/senior/info/[seniorId]/SeniorInfo';
import { getDetailSeniorInfoFetch } from '@/api/senior/[id]/getDetailSeniorInfo';

export default async function SeniorDetailInfoPage({
  params,
}: {
  params: { seniorId: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['seniorInfo', params.seniorId],
    queryFn: () => getDetailSeniorInfoFetch({ seniorId: params.seniorId }),
  });

  const seniorData = await getDetailSeniorInfoFetch({
    seniorId: params.seniorId,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seniorData.nickName,
    description: seniorData.oneLiner,
    memberOf: {
      '@type': 'Organization',
      name: seniorData.lab,
    },
    jobTitle: seniorData.info,
    image: seniorData.profile,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hydrate state={dehydrate(queryClient)}>
        <SeniorInfoPage params={params} />
      </Hydrate>
    </>
  );
}
