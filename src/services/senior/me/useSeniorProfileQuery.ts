import { useQuery } from '@tanstack/react-query';
import { seniorInfoGetFetch } from '@/api/senior/me/seniorInfoGetFetch';
import { objectCompact } from '@/utils/objectCompact';

//TODO: 주석제거 필요
/**
 * 내가 senior 일 때, 정보수정 페이지 진입 시 유저정보 조회
 */
export const useSeniorProfileQuery = () =>
  useQuery({
    queryKey: ['@/senior/me/profile'],
    queryFn: async () => {
      const response = await seniorInfoGetFetch();
      console.log('넌 왜 요청이 안가냐?', response);
      const isError = response.data.code.includes('EX');

      if (isError) {
        throw new Error('정보 조회에 실패했습니다. 다시 시도해주세요.');
      }

      const { keyword, field, times, ...rest } = response.data.data;

      return {
        keyword,
        field,
        times,
        ...objectCompact(rest),
      };
    },
    enabled: typeof window !== 'undefined',
  });
