import { SetStateAction } from 'jotai';

type SetAtom<Args extends any[], Result> = (..._args: Args) => Result;

export interface MatchingFormProps {
  title: string;
  isRequired: boolean;
  placeholder: string;
  maxLength: number;
  handler: SetAtom<[SetStateAction<string>], void>;
  charCount: number;
}
