import { atomWithStorage } from "jotai/utils";
import { UserInfo } from "../user-info/schemas/user-info";
import { EducationAndWorks } from "../educations-and-works/schemas/education-and-works";

type OnboardingAtom = UserInfo & EducationAndWorks;

export const onboardingAtom = atomWithStorage<OnboardingAtom>(
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
