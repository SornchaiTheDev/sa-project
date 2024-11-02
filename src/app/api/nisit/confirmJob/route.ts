import { ConfirmJobPayload } from "~/app/(authed)/(default-layout)/confirm/mutateFns/confirmJobFn";
import { jwtMiddleware } from "../../_middlewares/jwtMiddleware";
import { confirmJob } from "~/backend/models/job-register-model";
import { UserInfo } from "~/types/userInfo";

export const POST = jwtMiddleware(async (_: UserInfo, req) => {
  const body = (await req.json()) as ConfirmJobPayload[];

  try {
    for (const payload of body) {
      await confirmJob(payload.id, payload.status);
    }
    return Response.json({
      code: "SUCCESS",
    });
  } catch (err) {}
  return Response.json({
    code: "ERROR",
    message: "Something went wrong. Please try again later.",
  });
});
