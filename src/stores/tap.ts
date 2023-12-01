import { atom } from 'jotai';
import { tapType, sftapType } from '@/types/tap/tap';
import { TAB, SFTAB, SMTAB } from '@/constant/tab/ctap';

export const activeTabAtom = atom<tapType>(TAB.waiting);

export const sfactiveTabAtom = atom<sftapType>(SFTAB.AI);
export const suactiveTabAtom = atom<sftapType>(SMTAB.ALL);
