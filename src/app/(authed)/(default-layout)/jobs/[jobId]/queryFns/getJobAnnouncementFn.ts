import axios from "axios";
import { JobAnnouncement } from "~/types/DTO/jobAnnouncement";

export const getJobAnnouncementFn = async (jobId: string) => {
  const { data } = await axios.get<{ announcement: JobAnnouncement }>(
    `/api/announcements/${jobId}`,
  );
  return data.announcement;
};
