import axios from "axios";
import { ConnectJobAWithCompany } from "~/types/jobAnnouncer";

export const createJobAnnouncer = async (
  jobAnnouncer: ConnectJobAWithCompany,
) => {
  const res = await axios.post("/api/hr/register", jobAnnouncer);
  return res.data;
};
