import { atom } from 'jotai';
import { tapType } from '@/types/tap/tap';

export const essential = atom<boolean>(false);
export const allchecked = atom<boolean>(false);
export const option = atom<boolean>(false);

export const activeTabAtom = atom<tapType>(0);
