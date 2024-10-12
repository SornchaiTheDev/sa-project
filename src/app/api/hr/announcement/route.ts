import { JobAnnouncementRepository } from "~/backend/repositories/jobAnnouncementRepository";
import { jobAMiddleware } from "../../_middlewares/jobAMiddlware";
import { JobAnnouncementDTO } from "~/backend/DTO/jobAnnouncementDTO";

export const POST = jobAMiddleware(async (hrInfo, req) => {
  const jobAnnouncementRepo = new JobAnnouncementRepository();
  const body = (await req.json()) as JobAnnouncementDTO;

  await jobAnnouncementRepo.create(body, hrInfo.username);

  return Response.json({
    message: "OK",
  });
});
