import axios from "axios";
import { EnrollToPosition } from "~/backend/models/job-register-model";

export const enrollFn = async (payload: EnrollToPosition) => {
  const res = await axios.post<{
    code: "ENROLL_SUCCESS" | "ENROLL_FAILED" | "ALREADY_ENROLLED";
    message: string;
  }>("/api/nisit/enroll", payload);
  return res.data;
};
