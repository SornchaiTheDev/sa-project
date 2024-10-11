import axios from "axios";
import { JobAnnouncerDTO } from "~/backend/DTO/jobAnnouncerDTO";

export const createJobAnnouncer = async (jobAnnouncer: JobAnnouncerDTO) => {
  const res = await axios.post("/api/hr/register", jobAnnouncer);
  return res.data;
};
