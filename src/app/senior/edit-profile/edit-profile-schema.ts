import * as yup from 'yup';

const timeDataSchema = yup.object().shape({
  day: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
});

const scheduleSchema = yup.object().shape({
  times: yup
    .array()
    .of(timeDataSchema)
    .required()
    .min(3, '최소 3개 이상 일정을 추가해주세요'),
});

export const editProfileSchema = yup.object({
  lab: yup
    .string()
    .min(1, '연구실 이름을 입력해주세요')
    .required('연구실 이름을 입력해주세요')
    .max(20),
  field: yup.string().required('최소 1개 이상 선택해주세요').min(1),
  keyword: yup.string().required('최소 1개 이상 입력해주세요').min(1),
  singleIntro: yup
    .string()
    .required('최소 10자 이상 작성해주세요.')
    .min(10, '최소 10자 이상 작성해주세요.')
    .max(100, '100자 이내로 입력해주세요'),
  multiIntro: yup
    .string()
    .required('최소 50자 이상 작성해주세요.')
    .min(50, '최소 50자 이상 작성해주세요.')
    .max(1000, '1000자 이내로 입력해주세요.'),
  recommended: yup
    .string()
    .required('최소 50자 이상 작성해주세요.')
    .min(50, '최소 50자 이상 작성해주세요.')
    .max(1000, '1000자 이내로 입력해주세요.'),
  chatLink: yup.string().required().min(1),
  timeData: scheduleSchema,
});
