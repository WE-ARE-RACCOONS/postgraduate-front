import { TimeObj } from '@/types/scheduler/scheduler';
import { atom } from 'jotai';

export const photoUrlAtom = atom<string>('');
export const sPostGraduAtom = atom<string>('');
export const sMajorAtom = atom<string>('');
export const sFieldAtom = atom<string>('');
export const sKeywordAtom = atom<string>('');
export const sLabAtom = atom<string>('');
export const sProfessorAtom = atom<string>('');

export const totalFieldAtom = atom<Array<string>>([
  '인공지능',
  '반도체',
  '바이오',
  '에너지',
]);
export const selectedFieldAtom = atom<Array<string>>([]);

export const totalKeywordAtom = atom<Array<string>>([]);
export const selectedKeywordAtom = atom<Array<string>>([]);

export const sSingleIntroduce = atom<string>('');
export const sMultiIntroduce = atom<string>('');
export const sRecommendedFor = atom<string>('');
export const sAbleTime = atom<Array<TimeObj>>([]);
export const sChatLink = atom<string>('');

export const mySeniorId = atom<number>(0);
export const enterSeniorId = atom<string>('');
