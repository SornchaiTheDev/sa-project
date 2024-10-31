import { getRecentJobAnnouncements } from "~/backend/models/jobAnnouncement-model";

export const GET = async () => {
  const announcements = await getRecentJobAnnouncements();

  return Response.json({
    announcements,
  });
};
