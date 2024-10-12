import axios from "axios";
import type { JobAnnouncementPreview } from "~/backend/DTO/jobAnnouncementDTO";

export const fetchAnnouncementsFn = async (search: string) => {
  const res = await axios.get<{ announcements: JobAnnouncementPreview[] }>(
    `/api/hr/announcements?search=${search}`,
  );

  return res.data;
};
