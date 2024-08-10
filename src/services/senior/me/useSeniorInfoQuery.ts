import { useQuery } from '@tanstack/react-query';
import { seniorInfoGetFetch } from '@/api/senior/me/seniorInfoGetFetch';

/**
 * 내가 senior 일 때, 정보수정 페이지 진입 시 유저정보 조회
 */
export const useSeniorInfoQuery = () =>
  useQuery({
    queryKey: ['@/senior/me'],
    queryFn: async () => {
      const response = await seniorInfoGetFetch();

      const errCode = response.data.code.includes('EX');

      if (errCode) {
        throw new Error('정보 조회에 실패했습니다. 다시 시도해주세요.');
      }

      return response.data.data;
    },
  });
