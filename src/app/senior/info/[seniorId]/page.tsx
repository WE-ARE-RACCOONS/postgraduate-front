import { Hydrate, QueryClient, dehydrate } from '@tanstack/react-query';
import { SeniorInfoPage } from '@/app/senior/info/[seniorId]/SeniorInfo';
import {
  getDetailSeniorInfoFetch,
  SeniorInfoResponse,
} from '@/api/senior/[id]/getDetailSeniorInfo';

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

  const seniorData = (
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/${params.seniorId}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    )
  ).json() as Promise<SeniorInfoResponse>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: (await seniorData).data.nickName,
    description: (await seniorData).data.oneLiner,
    memberOf: {
      '@type': 'Organization',
      name: (await seniorData).data.lab,
    },
    jobTitle: (await seniorData).data.info,
    image: (await seniorData).data.profile,
  };

  console.log(jsonLd);
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hydrate state={dehydrate(queryClient)}>
        <SeniorInfoPage params={params} />
      </Hydrate>
    </section>
  );
}
