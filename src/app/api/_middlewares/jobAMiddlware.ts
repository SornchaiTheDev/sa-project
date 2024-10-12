import { HRInfo } from "~/types/hrInfo";
import { jwtMiddleware } from "./jwtMiddleware";

export const jobAMiddleware = (
  next: (info: HRInfo, req: Request) => Promise<Response>,
) =>
  jwtMiddleware(async (info: HRInfo, req: Request) => {
    if (info.role !== "JOB_ANNOUNCER") {
      return Response.json(
        {
          message: "Unauthorized",
          code: "UNAUTHORIZED",
        },
        { status: 401 },
      );
    }
    return next(info, req);
  });
