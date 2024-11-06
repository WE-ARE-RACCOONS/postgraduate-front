import * as yup from 'yup';

export const phoneNumSchema = yup.object({
  phoneNum: yup
    .string()
    .required('휴대폰 번호를 입력해 주세요.')
    .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
    .length(11, '휴대폰 번호는 11자리여야 합니다.')
    .test(
      'is-valid-phone-prefix',
      '휴대폰 번호는 010으로 시작해야 합니다.',
      (value) => {
        return value ? value.startsWith('010') : true;
      },
    ),
});
