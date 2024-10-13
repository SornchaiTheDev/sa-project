import { atom } from "jotai";

type TabStore = "companies" | "members";

export const tabStore = atom<TabStore>("companies");
