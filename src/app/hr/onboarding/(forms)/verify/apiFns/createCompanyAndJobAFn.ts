import axios from "axios";
import { HRSignUpStore } from "~/app/hr/auth/store/hr-sign-up-store";

export const createCompanyAndJobAFn = async (body: HRSignUpStore) => {
  const res = await axios.post("/api/hr/register/company", body);
  return res.data;
};
