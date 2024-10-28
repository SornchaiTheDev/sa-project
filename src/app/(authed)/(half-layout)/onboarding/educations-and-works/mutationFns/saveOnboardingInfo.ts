import axios from "axios";
import type { StudentOnboarding } from "~/types/requests/student-onboarding";

export const saveOnboardingInfo = async (userInfo: StudentOnboarding) => {
  const res = await axios.post("/api/nisit/onboarding", userInfo);
  return res.data;
};
