import * as yup from 'yup';

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
});
