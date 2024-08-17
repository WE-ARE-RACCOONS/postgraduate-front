import { PrimitiveAtom, SetStateAction } from 'jotai';
import { ComponentPropsWithRef } from 'react';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

/** '한 줄' | '여러 줄' 명시하는 부분 */
export type lineType = 'single' | 'multi';
export type profileFormType = 'singleIntro' | 'multiIntro' | 'recommendedFor';

export interface ProfileFormProps extends ComponentPropsWithRef<'input'> {
  flag: boolean;
  lineType: lineType;
  title: string;
  maxLength?: number; // lineType이 'multi'인 경우에만 들어옴
  loadStr: string;
  formType: profileFormType;
  changeHandler?: SetAtom<[SetStateAction<string>], void>;
  register?:UseFormRegisterReturn
}
