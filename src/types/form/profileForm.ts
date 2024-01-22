import { PrimitiveAtom, SetStateAction } from 'jotai';

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

/** '한 줄' | '여러 줄' 명시하는 부분 */
export type lineType = 'single' | 'multi';
export type profileFormType = 'singleIntro' | 'multiIntro' | 'recommendedFor';

export interface ProfileFormProps {
  flag: boolean;
  lineType: lineType;
  title: string;
  maxLength?: number; // lineType이 'multi'인 경우에만 들어옴
  placeholder: string;
  loadStr: string;
  formType: profileFormType;
  changeHandler: SetAtom<[SetStateAction<string>], void>;
}
