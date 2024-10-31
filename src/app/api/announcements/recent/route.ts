import { getRecentJobAnnouncements } from "~/backend/models/jobAnnouncement-model";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const announcements = await getRecentJobAnnouncements();

  return Response.json({
    announcements,
  });
};
