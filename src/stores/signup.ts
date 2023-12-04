import { userType } from '@/types/user/user';
import { atom } from 'jotai';

export const userTypeAtom = atom<userType>('junior');

/** '보던 페이지로 이동'을 위한 이전 경로 */
export const prevPathAtom = atom<string>('/');

export const nickname = atom<string>('');
export const notDuplicate = atom<boolean>(true);
export const phoneNum = atom<string>('');
export const phoneNumValidation = atom<boolean>(false);

export const socialIdAtom = atom<string>('');