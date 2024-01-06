import { TimeObj } from '@/types/scheduler/scheduler';
import { atom } from 'jotai';

export const subjectAtom = atom<string>('');
export const questionAtom = atom<string>('');

export const sAbleMentoringTimeArr = atom<Array<TimeObj>>([]);
