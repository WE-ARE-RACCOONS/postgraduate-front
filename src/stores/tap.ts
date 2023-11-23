import { atom } from 'jotai';
import { tapType } from '@/types/tap/tap';

export const activeTabAtom = atom<tapType>('waiting');
