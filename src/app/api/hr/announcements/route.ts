import {
  CreateJobAnnouncement,
  createJobAnnouncement,
  getJobAnnouncementsByCompanyID,
} from "~/backend/models/jobAnnouncement-model";
import { jobAMiddleware } from "../../_middlewares/jobAMiddlware";

export const POST = jobAMiddleware(async (hrInfo, req) => {
  const { username } = hrInfo;

  const body = (await req.json()) as CreateJobAnnouncement;

  await createJobAnnouncement(username, body);

  return Response.json({
    message: "OK",
  });
});

export const GET = jobAMiddleware(async (hrInfo, req) => {
  const searchParam = new URL(req.url).searchParams;
  const search = searchParam.get("search") ?? "";

  const announcements = await getJobAnnouncementsByCompanyID(
    hrInfo.companyId,
    search,
  );

  return Response.json({
    announcements,
  });
});
