import { atomWithStorage } from "jotai/utils";
import { Onboarding } from "../types/onboarding-type";
import { atom } from "jotai";

export const onboardingAtom = atomWithStorage<Onboarding>(
  "onboarding",
  {
    prefix: "",
    firstName: "",
    surName: "",
    email: "",
    bod: new Date(),
    phone: "",
    gpax: "",
    activitiesHours: "",
    faculty: "",
    major: "",
    workExp: "",
  },
  undefined,
  { getOnInit: true },
);

export const resetOnboardingAtom = atom(null, (_, set) => {
  set(onboardingAtom, {
    prefix: "",
    firstName: "",
    surName: "",
    email: "",
    bod: new Date(),
    phone: "",
    gpax: "",
    activitiesHours: "",
    faculty: "",
    major: "",
    workExp: "",
  });

  localStorage.removeItem("onboarding");
});
