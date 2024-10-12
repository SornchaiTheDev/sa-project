import { cookies } from "next/headers";
import { env } from "~/configs/env";
import { getPayload, verifyJwt } from "~/lib/jwt";

export const jwtMiddleware =
  <T>(next: (info: T, req: Request) => Promise<Response>) =>
  async (req: Request) => {
    const accessToken = cookies().get("access_token")?.value;
    if (accessToken !== undefined) {
      const isValid = await verifyJwt(accessToken, env.JWT_SECRET);
      if (isValid) {
        const userInfo = getPayload<T>(accessToken);
        return next(userInfo, req);
      }
    }

    return Response.json(
      {
        message: "Unauthorized",
        code: "UNAUTHORIZED",
      },
      { status: 401 },
    );
  };
