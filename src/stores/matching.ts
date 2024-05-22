import { atom } from 'jotai';

export const desiredSchool = atom<string>('');
export const desiredField = atom<string>('');
export const desiredSchoolLen = atom((get) => get(desiredSchool).length);
export const desiredFieldLen = atom((get) => get(desiredField).length);

export const matchingReceiveAtom = atom<boolean>(true);
