import { jwtMiddleware } from "~/app/api/_middlewares/jwtMiddleware";
import { hasRemainingConfirmJob } from "~/backend/models/student-model";
import { UserInfo } from "~/types/userInfo";

export const GET = jwtMiddleware(async (info: UserInfo, req: Request) => {
  const { uid } = info;

  const hasRemainingJob = await hasRemainingConfirmJob(uid);

  return Response.json({
    hasRemainingJob,
  });
});
