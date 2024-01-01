import { PrimitiveAtom } from 'jotai';

export interface TextareaFormProps {
  title: string;
  placeholder: string;
  minCount: number;
  maxCount: number;
  alertMsg: string;
  targetAtom: PrimitiveAtom<string>;
}
