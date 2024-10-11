import { atomWithStorage } from "jotai/utils";
import { HRSignUpSchema } from "../sign-up/schemas/hr-signup-schema";
import { HRInfo } from "~/app/hr/onboarding/(forms)/user-info/schemas/hr-info-schema";
import { CompanyInfo } from "~/app/hr/onboarding/(forms)/company/create/schemas/company-info-schema";
import { atom } from "jotai";

export type HRSignUpStore = HRSignUpSchema &
  HRInfo &
  CompanyInfo & { isVerified: boolean };

const defaultValues: HRSignUpStore = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  title: "",
  firstName: "",
  lastName: "",
  phone: "",
  taxId: "",
  name: "",
  address: "",
  type: "none",
  bookUrl: [],
  logoUrl: [],
  category: "",
  isVerified: false,
};

export const hrSignUpAtom = atomWithStorage<HRSignUpStore>(
  "hrSignUp",
  defaultValues,
  undefined,
  { getOnInit: true },
);

export const resetHrSignUpAtom = atom(null, (_, set) => {
  set(hrSignUpAtom, defaultValues);
});
