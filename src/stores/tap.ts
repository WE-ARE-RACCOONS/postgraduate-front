import { atom } from 'jotai';
import { tapType } from '@/types/tap/tap';
import { TAB } from '@/constant/tab/ctap';

export const activeTabAtom = atom<tapType>(TAB.waiting);
