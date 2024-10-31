import axios from "axios";
import type { CreateJobAnnouncement } from "~/backend/models/jobAnnouncement-model";

export const createAnnouncementFn = async (payload: CreateJobAnnouncement) => {
  return await axios.post("/api/hr/announcements", payload);
};
