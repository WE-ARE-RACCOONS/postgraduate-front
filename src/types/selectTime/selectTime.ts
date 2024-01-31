import { PrimitiveAtom } from 'jotai';

export interface SelectTimeProps {
  numStr: string;
  targetAtom: PrimitiveAtom<string>;
  checkTrigger: boolean;
}

export interface SelectCalendarProps {
  modalHandler: () => void;
  targetAtom: PrimitiveAtom<string>;
}
