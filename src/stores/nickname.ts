import { atom } from "jotai";

export const nickname = atom<string>('');
export const notDuplicate = atom<boolean>(false);