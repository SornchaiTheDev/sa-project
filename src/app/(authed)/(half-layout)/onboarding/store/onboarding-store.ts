import { atomWithStorage } from "jotai/utils";
import { Onboarding } from "../types/onboarding-type";
import { atom } from "jotai";

export const onboardingAtom = atomWithStorage<Onboarding>(
  "onboarding",
  {
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date(),
    phoneNumber: "",
    gpax: "",
    activitiyHour: "",
    faculty: "",
    major: "",
    description: "",
  },
  undefined,
  { getOnInit: true },
);

export const resetOnboardingAtom = atom(null, (_, set) => {
  set(onboardingAtom, {
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date(),
    phoneNumber: "",
    gpax: "",
    activitiyHour: "",
    faculty: "",
    major: "",
    description: "",
  });

  localStorage.removeItem("onboarding");
});
