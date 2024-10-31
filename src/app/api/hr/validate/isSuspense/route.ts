import { jwtMiddleware } from "~/app/api/_middlewares/jwtMiddleware";
import {
  getAllRecruitedCandidatesByAnnouncementId,
  getRemainingCandidatesByAnnouncementId,
  getRecentJobAnnouncement,
} from "~/backend/models/jobAnnouncement-model";
import { HRInfo } from "~/types/hrInfo";

export const GET = jwtMiddleware(async (info: HRInfo) => {
  const { username } = info;
  const jobId = await getRecentJobAnnouncement(info.username);
  if (jobId !== null) {
    const allRecruited = await getAllRecruitedCandidatesByAnnouncementId(jobId);

    const remainingCandidates = await getRemainingCandidatesByAnnouncementId(
      username,
      jobId,
      allRecruited,
    );

    const count = remainingCandidates.length;

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
