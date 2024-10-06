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
  return (
    <Hydrate state={dehydrate(queryClient)}>
      <SeniorInfoPage params={params} />
    </Hydrate>
  );
}
