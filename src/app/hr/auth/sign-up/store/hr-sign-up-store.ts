import { atomWithStorage } from "jotai/utils";
import { HRSignUpSchema } from "../schemas/hr-signup-schema";
import { HRInfo } from "~/app/hr/onboarding/(forms)/user-info/schemas/hr-info-schema";

type HRSignUpStore = HRSignUpSchema & HRInfo;

export const hrSignUpAtom = atomWithStorage<HRSignUpStore>("hrSignUp", {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  title: "",
  firstName: "",
  surName: "",
  phone: "",
});
