import { PrimitiveAtom } from "jotai";

export interface SelectTimeProps {
  placeholder: string;
  targetAtom: PrimitiveAtom<string>
}

export interface SelectCalendarProps {
  modalHandler: () => void;
  targetAtom: PrimitiveAtom<string>
}