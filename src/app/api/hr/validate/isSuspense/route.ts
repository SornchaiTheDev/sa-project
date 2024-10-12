import { jwtMiddleware } from "~/app/api/_middlewares/jwtMiddleware";
import { JobAnnouncementRepository } from "~/backend/repositories/jobAnnouncementRepository";
import { HRInfo } from "~/types/hrInfo";

export const GET = jwtMiddleware(async (info: HRInfo) => {
  const jobAnnouncementRepo = new JobAnnouncementRepository();

  const jobId = await jobAnnouncementRepo.getRecentJobAID(info.username);
  if (jobId !== null) {
    const count = await jobAnnouncementRepo.countMissingAnnouncement(jobId);
    if (count > 0) {
      return Response.json({
        message: "There are missing announcements",
        code: "SUSPENSED",
      });
    }
  }

  return Response.json({
    message: "There are no missing announcements",
    code: "OK",
  });
});
