import * as yup from 'yup';

export type SeniorEditFormType = yup.InferType<typeof seniorProfileSchema>;

export const seniorProfileSchema = yup.object({
  lab: yup.string().required('연구실 명을 입력해주세요.'),
  field: yup
    .array()
    .min(1, '최소 1개 이상의 연구분야를 선택해주세요.')
    .required('연구분야를 선택해주세요.'),
  keyword: yup
    .array()
    .min(1, '최소 1개 이상의 연구주제를 선택해주세요.')
    .required('연구주제를 선택해주세요.'),

  chatLink: yup.lazy((value) =>
    value && value.length > 0
      ? yup.string().url('유효한 주소를 입력해주세요.')
      : yup.string().notRequired(),
  ),

  oneLiner: yup.lazy((value) =>
    value && value.length > 0
      ? yup.string().min(10, '최소 10자 이상 입력해주세요.')
      : yup.string().notRequired(),
  ),

  info: yup.lazy((value) =>
    value && value.length > 0
      ? yup.string().min(50, '최소 50자 이상 입력해주세요.')
      : yup.string().notRequired(),
  ),

  target: yup.lazy((value) =>
    value && value.length > 0
      ? yup.string().min(20, '최소 20자 이상 입력해주세요.')
      : yup.string().notRequired(),
  ),

  times: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      day: yup.string().required('요일을 선택해주세요.'),
      startTime: yup
        .string()
        .matches(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          '유효한 시작 시간을 입력해주세요.',
        )
        .required('시작 시간을 입력해주세요.'),
      endTime: yup
        .string()
        .matches(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          '유효한 종료 시간을 입력해주세요.',
        )
        .required('종료 시간을 입력해주세요.'),
    }),
  ),
});
