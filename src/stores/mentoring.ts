import { TimeObj } from '@/types/scheduler/scheduler';
import { atom } from 'jotai';

export const subjectAtom = atom<string>('');
export const questionAtom = atom<string>('');

export const sAbleMentoringTimeArr = atom<Array<TimeObj>>([]);
export const firAbleTimeAtom = atom<string>('');
export const secAbleTimeAtom = atom<string>('');
export const thiAbleTimeAtom = atom<string>('');
export const orderIdAtom = atom<string>('');
export const paySeniorIdAtom = atom<string>('');