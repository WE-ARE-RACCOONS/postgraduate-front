import { SeniorProfileData } from '@/types/profile/seniorProfile';
import { atom } from 'jotai';

export const pageNumAtom = atom<number>(1);
export const listDataAtom = atom<Array<SeniorProfileData>>([]);
