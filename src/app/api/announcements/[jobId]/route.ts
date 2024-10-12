import { JobAnnouncementRepository } from "~/backend/repositories/jobAnnouncementRepository";

export const GET = async (
  _: Request,
  { params }: { params: { jobId: string } },
) => {
  const { jobId } = params;
  const announcementRepo = new JobAnnouncementRepository();
  const res = await announcementRepo.getById(jobId);
  return Response.json({
    res,
  });
};
