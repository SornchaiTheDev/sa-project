import axios from "axios";
import type { Candidate } from "~/types/candidate";

export const getCandidates = async (
  announcementId: string,
  position: string,
  status: string,
) => {
  const res = await axios.get<{ candidates: Candidate[] }>(
    `/api/hr/announcements/${announcementId}/candidates?position=${position}&status=${status}`,
  );
  return res.data.candidates;
};
