import { atom } from "jotai";

export const accessTokenAtom = atom<string>('');
export const accessExpireAtom = atom<Date>(new Date());