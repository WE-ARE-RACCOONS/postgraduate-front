import { object, string, InferType, ValidationError } from 'yup';

const VALIDATE_MSG = {
  no_single_intro: '한줄소개를 입력해주세요',
  no_multi_intro: '자기소개를 입력해주세요',
  no_recommended: '추천대상을 입력해주세요',
  min_single_intro_length: '최소 10자 이상 입력해 주세요.',
  min_multi_intro_length: '자기소개를 50자 이상 작성해주세요',
  min_recommended_length: '추천대상을 50자 이상 작성해주세요',
};

export const addProfileSchema = object({
  singleIntro: string()
    .required(VALIDATE_MSG.no_single_intro)
    .min(10, VALIDATE_MSG.min_single_intro_length),
  multiIntro: string()
    .required(VALIDATE_MSG.no_multi_intro)
    .min(50, VALIDATE_MSG.min_multi_intro_length),
  recommended: string()
    .required(VALIDATE_MSG.no_recommended)
    .min(50, VALIDATE_MSG.min_recommended_length),
});

type AddProfile = InferType<typeof addProfileSchema>;

export const validateAddProfileError = async (data: AddProfile) => {
  try {
    await addProfileSchema.validate(data);
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log(e);
      throw e;
    }
  }
};
