import { jwtMiddleware } from "~/app/api/_middlewares/jwtMiddleware";
import { getRecentJobAnnouncement } from "~/backend/models/jobAnnouncement-model";
import { HRInfo } from "~/types/hrInfo";

export const GET = jwtMiddleware(async (info: HRInfo) => {
  const jobId = await getRecentJobAnnouncement(info.username);
  console.log(jobId);
  // if (jobId !== null) {
  //   const count = await jobAnnouncementRepo.countMissingAnnouncement(jobId);
  //   if (count > 0) {
  //     return Response.json({
  //       message: "There are missing announcements",
  //       code: "SUSPENSED",
  //     });
  //   }
  // }

  return Response.json({
    message: "There are no missing announcements",
    code: "OK",
  });
});
