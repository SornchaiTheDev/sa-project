import { atom } from "jotai";
import { Candidate } from "~/types/candidate";

export const candidateAtom = atom<Candidate[]>([]);
