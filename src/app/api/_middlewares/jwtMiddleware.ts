import { cookies } from "next/headers";
import { env } from "~/configs/env";
import { getPayload, verifyJwt } from "~/lib/jwt";

export const jwtMiddleware =
  <T>(next: (info: T) => Promise<Response>) =>
  async () => {
    const accessToken = cookies().get("access_token")?.value;
    if (accessToken !== undefined) {
      const isValid = await verifyJwt(accessToken, env.JWT_SECRET);
      if (isValid) {
        const userInfo = getPayload<T>(accessToken);
        return next(userInfo);
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
