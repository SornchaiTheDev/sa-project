import { atom } from "jotai";

interface SelectedPosition {
  name: string;
  id: string;
}

export const positionAtom = atom<SelectedPosition[]>([]);

export const confirmEnrollAtom = atom<boolean>(false);
