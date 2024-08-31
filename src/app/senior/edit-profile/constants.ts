import { SeniorInfoResponse } from '@/api/senior/me/seniorInfoGetFetch';

type SeniorProfileFormDefaultType = PropType<SeniorInfoResponse, 'data'>;

export const SENIOR_PROFILE_DEFAULT_STATE = {
  keyword: [] as string[],
  lab: '',
  info: '',
  target: '',
  chatLink: '',
  field: [] as string[],
  outLinter: '',
  times: [] as PropType<SeniorProfileFormDefaultType, 'times'>,
} satisfies SeniorProfileFormDefaultType;
