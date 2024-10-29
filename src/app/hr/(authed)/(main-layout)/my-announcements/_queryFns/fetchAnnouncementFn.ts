import axios from "axios";

interface JobAnnouncementPreview {
  id: string;
  name: string;
}

export const fetchAnnouncementsFn = async () => {
  const res = await axios.get<{ announcements: JobAnnouncementPreview[] }>(
    `/api/hr/announcements`,
  );

  return res.data;
};
