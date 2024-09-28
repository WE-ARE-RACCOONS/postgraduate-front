import { SeniorInfoResponse } from '@/api/senior/me/seniorInfoGetFetch';
import { SeniorEditFormType } from './validator';
import { SeniorInfoPatchFetchParams } from '@/api/senior/me/seniorInfoPatchFetch';

type SeniorEditFormDataType = PropType<SeniorInfoResponse, 'data'>;

export const getSeniorEditFormCleansingData = (
  data: Partial<SeniorEditFormDataType>,
) => {
  return {
    ...data,
    // keyword:
    //   data.keyword && data?.keyword.length > 0
    //     ? data?.keyword.map((item) => `#${item}`).join(', ')
    //     : '',
    times: data.times ?? [],
  };
};

/**
 * 멘토 프로필 정보 수정 파라미터 포맷팅
 */
export const getSeniorPatchFetchParamsCleansingData = (
  data: SeniorEditFormType,
) => {
  const { field, keyword, times } = data;
  return {
    ...data,
    field: field.length > 0 ? field.join(', ') : '',
    keyword: keyword.length > 0 ? keyword.join(', ') : '',
    times:
      times &&
      times.map((item) => {
        const { id, ...rest } = item;

        return rest;
      }),
  } as Omit<SeniorInfoPatchFetchParams, 'isNext'>;
};
