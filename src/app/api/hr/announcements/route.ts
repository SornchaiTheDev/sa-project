import { JobAnnouncementRepository } from "~/backend/repositories/jobAnnouncementRepository";
import { jobAMiddleware } from "../../_middlewares/jobAMiddlware";
import { JobAnnouncementDTO } from "~/backend/DTO/jobAnnouncementDTO";

const jobAnnouncementRepo = new JobAnnouncementRepository();
export const POST = jobAMiddleware(async (hrInfo, req) => {
  const body = (await req.json()) as JobAnnouncementDTO;

  const { username, companyId } = hrInfo;

  await jobAnnouncementRepo.create(body, username, companyId);

  return Response.json({
    message: "OK",
  });
});

export const GET = jobAMiddleware(async (hrInfo, req) => {
  const searchParam = new URL(req.url).searchParams;
  const search = searchParam.get("search") ?? "";

  const announcements =
    await jobAnnouncementRepo.getAllJobAnnouncementByCompanyID(
      hrInfo.companyId,
      search,
    );

  return Response.json({
    announcements,
  });
});
