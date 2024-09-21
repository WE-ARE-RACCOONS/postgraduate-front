import { PrimitiveAtom, SetStateAction } from 'jotai';
import { ChangeEvent } from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

/** '한 줄' | '여러 줄' 명시하는 부분 */
export type lineType = 'single' | 'multi';
export type profileFormType = 'singleIntro' | 'multiIntro' | 'recommendedFor';

export interface ProfileFormProps {
  flag: boolean;
  lineType: lineType;
  title: string;
  maxLength?: number; // lineType이 'multi'인 경우에만 들어옴
  loadStr: string;
  formType: profileFormType;
  changeHandler?: SetAtom<[SetStateAction<string>], void>;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  errorMessage?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
}
