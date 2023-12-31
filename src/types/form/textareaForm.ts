import { PrimitiveAtom } from 'jotai';

export interface TextareaFormProps {
  title: string;
  placeholder: string;
  maxCount: number;
  targetAtom: PrimitiveAtom<string>;
}
