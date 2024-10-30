import { HRInfo } from "~/types/hrInfo";
import { jwtMiddleware, type Params } from "./jwtMiddleware";

export const jobAMiddleware = (
  next: (info: HRInfo, req: Request, params: Params) => Promise<Response>,
) =>
  jwtMiddleware(async (info: HRInfo, req: Request, params) => {
    if (info.role !== "JOB_ANNOUNCER") {
      return Response.json(
        {
          message: "Unauthorized",
          code: "UNAUTHORIZED",
        },
        { status: 401 },
      );
    }
    return next(info, req, params);
  });
