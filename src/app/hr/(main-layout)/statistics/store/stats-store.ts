import { atom } from "jotai";

export type FilterCategory = "overall" | "full-time" | "part-time";

export interface CompareStats {
  total: number;
  lastMonth: number;
}

interface CardStatsAtom {
  jobs: CompareStats;
  applicants: CompareStats;
  accepted: CompareStats;
  waiting: CompareStats;
}

export const cardStatsAtom = atom<CardStatsAtom>({
  jobs: {
    total: 0,
    lastMonth: 0,
  },
  applicants: {
    total: 0,
    lastMonth: 0,
  },
  accepted: {
    total: 0,
    lastMonth: 0,
  },
  waiting: {
    total: 0,
    lastMonth: 0,
  },
});

export const categoryAtom = atom<FilterCategory>("overall");

export type FilterChart =
  | "year"
  | "6-months"
  | "3-months"
  | "month"
  | "week"
  | "day";

export const chartFilterAtom = atom<FilterChart>("day");

export interface LeaderBoard {
  name: string;
  amount: number;
  percentage: number;
}

export const leaderboardAtom = atom<LeaderBoard[]>([
  {
    name: "Software Engineer",
    amount: 100,
    percentage: 20,
  },
  {
    name: "UX/UI Designer",
    amount: 50,
    percentage: 10,
  },
  {
    name: "Grpahic Designer",
    amount: 50,
    percentage: 10,
  },
  {
    name: "Data Analyst",
    amount: 50,
    percentage: 10,
  },

  {
    name: "Nurse",
    amount: 50,
    percentage: 10,
  },
  {
    name: "Data scientist",
    amount: 50,
    percentage: 10,
  },
]);
