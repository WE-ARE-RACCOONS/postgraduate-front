import { UseFormRegisterReturn } from 'react-hook-form';

export type TextFormTargetAtom = 'lab' | 'professor' | 'keyword';

export interface TextFormProps {
  targetAtom: string;
  placeholder: string;
  max?: number;
  register?: UseFormRegisterReturn;
}
