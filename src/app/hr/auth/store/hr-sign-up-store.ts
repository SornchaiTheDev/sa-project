import { atomWithStorage } from "jotai/utils";
import { HRSignUpSchema } from "../sign-up/schemas/hr-signup-schema";
import { HRInfo } from "~/app/hr/onboarding/(forms)/user-info/schemas/hr-info-schema";
import { CompanyInfo } from "~/app/hr/onboarding/(forms)/company/create/schemas/company-info-schema";

export type HRSignUpStore = HRSignUpSchema & HRInfo & CompanyInfo;

export const hrSignUpAtom = atomWithStorage<HRSignUpStore>(
  "hrSignUp",
  {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    title: "",
    firstName: "",
    surName: "",
    phone: "",
    taxId: "",
    name: "",
    address: "",
    type: "none",
    bookUrl: [],
    logoUrl: [],
    category: "",
  },
  undefined,
  { getOnInit: true },
);
