import { SeniorInfoResponse } from '@/api/senior/me/seniorInfoGetFetch';

type SeniorProfileFormDefaultType = PropType<SeniorInfoResponse, 'data'>;

export const SENIOR_PROFILE_DEFAULT_STATE = {
  keyword: [] as string[],
  lab: '',
  info: '',
  target: '',
  chatLink: '',
  field: [] as string[],
  oneLiner: '',
  times: [] as PropType<SeniorProfileFormDefaultType, 'times'>,
} satisfies SeniorProfileFormDefaultType;

export const DAY = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const HOUR = [
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
];

export const MINUTES = [
  {
    value: '00',
    label: '00',
  },
  {
    value: '30',
    label: '30',
  },
];

export const FIELDS = ['인공지능', '반도체', '바이오', '에너지'];
