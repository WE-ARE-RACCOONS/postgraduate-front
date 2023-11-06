import { atom } from "jotai";

export const nickname = atom<string>('a');
export const notDuplicate = atom<boolean>(false);