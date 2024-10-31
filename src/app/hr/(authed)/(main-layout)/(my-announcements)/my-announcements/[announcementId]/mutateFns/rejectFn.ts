import axios from "axios";

export const rejectFn = async (
  studentUsername: string,
  announcementId: string,
  positionId: string,
) => {
  const res = await axios.post<{ status: "SUCCESS" | "FAILED" }>(
    `/api/hr/announcements/${announcementId}/candidates/${studentUsername}/reject`,
    { positionId },
  );
  return res.data;
};
