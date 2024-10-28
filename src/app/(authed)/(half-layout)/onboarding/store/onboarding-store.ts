import { atomWithStorage } from "jotai/utils";
import { Onboarding } from "../types/onboarding-type";
import { atom } from "jotai";

export const onboardingAtom = atomWithStorage<Onboarding>(
  "onboarding",
  {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date(),
    phoneNumber: "",
    gpax: "",
    activityHours: "",
    faculty: "",
    major: "",
    description: "",
  },
  undefined,
  { getOnInit: true },
);

export const resetOnboardingAtom = atom(null, (_, set) => {
  set(onboardingAtom, {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date(),
    phoneNumber: "",
    gpax: "",
    activityHours: "",
    faculty: "",
    major: "",
    description: "",
  });

  localStorage.removeItem("onboarding");
});
