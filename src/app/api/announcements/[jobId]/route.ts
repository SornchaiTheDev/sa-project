import { getJobAnnouncementsById } from "~/backend/models/jobAnnouncement-model";
import { getPositionsByJobAnnouncementID } from "~/backend/models/position-model";

export const GET = async (
  _: Request,
  { params }: { params: { jobId: string } },
) => {
  const { jobId } = params;

  const announcement = await getJobAnnouncementsById(jobId);

  const positions = await getPositionsByJobAnnouncementID(jobId);

  return Response.json({
    announcement: {
      ...announcement,
      positions,
    },
  });
};
