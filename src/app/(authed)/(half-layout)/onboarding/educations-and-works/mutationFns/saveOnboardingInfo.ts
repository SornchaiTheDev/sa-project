import axios from "axios";
import type { UpdateStudent } from "~/backend/DTO/studentDTO";

export const saveOnboardingInfo = async (userInfo: UpdateStudent) => {
  const res = await axios.post("/api/nisit/onboarding", userInfo);
  return res.data;
};
