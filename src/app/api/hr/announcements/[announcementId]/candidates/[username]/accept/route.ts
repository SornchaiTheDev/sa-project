import { jobAMiddleware } from "~/app/api/_middlewares/jobAMiddlware";

export const POST = jobAMiddleware(async (hrInfo, _, { params }) => {
  const { username } = hrInfo;
  const { announcementId } = params;

  return Response.json({
    code: "SUCCESS",
    message: "Accept candidate successfully",
  });
});
