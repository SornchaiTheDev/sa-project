import { getJobAByUsername } from "~/backend/models/jobA-model";
import { jobAMiddleware } from "../_middlewares/jobAMiddlware";

export const GET = jobAMiddleware(async (hrInfo) => {
  const { username } = hrInfo;

  const jobA = await getJobAByUsername(username);
  return Response.json(jobA);
});
