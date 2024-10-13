import { jwtMiddleware, type Params } from "./jwtMiddleware";
import type { UserInfo } from "~/types/userInfo";

export const kusdMiddleware = <T extends UserInfo>(
  next: (info: T, req: Request, params: Params) => Promise<Response>,
) =>
  jwtMiddleware(async (info: T, req: Request, params) => {
    if (info.role !== "KUSD") {
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
