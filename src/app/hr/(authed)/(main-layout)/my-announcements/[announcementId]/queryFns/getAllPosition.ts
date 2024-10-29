import axios from "axios";

export const getAllPosition = async (announcementId: string) => {
  const res = await axios.get<{ positions: string[] }>(
    `/api/hr/announcements/${announcementId}/positions`,
  );

  return res.data.positions;
};
