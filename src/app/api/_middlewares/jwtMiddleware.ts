import { cookies } from "next/headers";
import { env } from "~/configs/env";
import { getPayload, verifyJwt } from "~/lib/jwt";

export type Params = { params: { [key: string]: string } };

export const jwtMiddleware =
  <T>(next: (info: T, req: Request, { params }: Params) => Promise<Response>) =>
  async (req: Request, params: Params) => {
    const accessToken = cookies().get("access_token")?.value;
    if (accessToken !== undefined) {
      try {
        const isValid = await verifyJwt(accessToken, env.JWT_SECRET);
        if (isValid) {
          const userInfo = getPayload<T>(accessToken);
          return next(userInfo, req, params);
        }
      } catch (_) {}
    }

    return Response.json(
      {
        message: "Unauthorized",
        code: "UNAUTHORIZED",
      },
      { status: 401 },
    );
  };
