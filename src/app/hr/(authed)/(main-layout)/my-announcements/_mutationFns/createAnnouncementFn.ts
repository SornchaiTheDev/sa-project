import axios from "axios";
import { JobAnnouncementDTO } from "~/backend/DTO/jobAnnouncementDTO";

export const createAnnouncementFn = async (payload: JobAnnouncementDTO) => {
  return await axios.post("/api/hr/announcements", payload);
};
