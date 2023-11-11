import { atom } from 'jotai';

export const nickname = atom<string>('');
export const notDuplicate = atom<boolean>(true);
export const phoneNum = atom<string>('');
export const phoneNumValidation = atom<boolean>(false);
