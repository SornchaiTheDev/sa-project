import { jwtMiddleware } from "~/app/api/_middlewares/jwtMiddleware";
import { getAllRemainingConfirmJob } from "~/backend/models/student-model";
import { UserInfo } from "~/types/userInfo";

export const GET = jwtMiddleware(async (info: UserInfo) => {
  const { uid } = info;

  const jobs = await getAllRemainingConfirmJob(uid);
  return Response.json({ jobs });
});
