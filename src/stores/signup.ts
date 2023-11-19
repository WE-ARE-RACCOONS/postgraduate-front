import { userType } from '@/types/user/user';
import { atom } from 'jotai';

export const userTypeAtom = atom<userType>('junior');

export const nickname = atom<string>('');
export const notDuplicate = atom<boolean>(true);
export const phoneNum = atom<string>('');
export const phoneNumValidation = atom<boolean>(false);
