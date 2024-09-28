import { useQuery } from '@tanstack/react-query';
import {
  seniorInfoGetFetch,
  SeniorInfoResponse,
} from '@/api/senior/me/seniorInfoGetFetch';
import { objectCompact } from '@/utils/objectCompact';
import { v4 as uuidv4 } from 'uuid';

/**
 * 내가 senior 일 때, 정보수정 페이지 진입 시 유저정보 조회
 */
export const useSeniorProfileQuery = () =>
  useQuery({
    queryKey: ['@/senior/me/profile'],
    queryFn: async () => {
      const response = await seniorInfoGetFetch();

      const isError = response.data.code.includes('EX');

      if (isError) {
        throw new Error('정보 조회에 실패했습니다. 다시 시도해주세요.');
      }

      const { keyword, field, times, ...rest } = response.data.data;

      console.log('서버데이터', times);
      return {
        keyword,
        field,
        times: [...times].map((item) => ({
          ...item,
          id: uuidv4(),
        })),
        ...objectCompact(rest),
      } as PropType<SeniorInfoResponse, 'data'>;
    },
    enabled: typeof window !== 'undefined',
    retry: false,
    throwOnError: false,
  });
