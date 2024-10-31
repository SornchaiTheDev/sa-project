import axios from "axios";
import type { JobAnnouncement } from "~/types/jobAnnouncement";

export const getRecentAnnouncements = async () => {
  const res = await axios.get<{ announcements: JobAnnouncement[] }>(
    "/api/announcements/recent",
  );
  return res.data.announcements;
};
