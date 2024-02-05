export type TextFormTargetAtom = 'lab' | 'professor' | 'keyword';

export interface TextFormProps {
  placeholder: string;
  targetAtom: string;
  max?: number;
}
