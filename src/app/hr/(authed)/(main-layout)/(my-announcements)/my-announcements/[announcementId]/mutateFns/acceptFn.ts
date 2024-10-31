import axios from "axios";

export const acceptFn = async (
  studentUsername: string,
  announcementId: string,
) => {
  const res = await axios.post<{ status: "SUCCESS" | "FAILED" }>(
    `/api/hr/announcements/${announcementId}/candidates/${studentUsername}/accept`,
  );
  return res.data;
};
