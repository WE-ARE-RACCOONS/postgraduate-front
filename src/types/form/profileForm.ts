import { SetStateAction } from "jotai";

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

/** '한 줄' | '여러 줄' 명시하는 부분 */
export type lineType = 'single' | 'multi';

export interface ProfileFormProps {
  lineType: lineType;
  title: string;
  maxLength?: number; // lineType이 'multi'인 경우에만 들어옴
  placeholder: string;
  changeHandler: SetAtom<[SetStateAction<string>], void>;
}