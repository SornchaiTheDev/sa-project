import dayjs from "dayjs";
import { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { env } from "~/configs/env";
import { setHTTPOnlyCookie } from "~/lib/cookies";
import { getPayload, signJwt, verifyJwt } from "~/lib/jwt";

export const POST = async () => {
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;

  if (accessToken === undefined || refreshToken === undefined) {
    return Response.json(
      {
        message: "TOKEN_NOT_FOUND",
        code: 400,
      },
      { status: 400 },
    );
  }

  try {
    await verifyJwt(accessToken, env.JWT_SECRET);
    await verifyJwt(refreshToken, env.JWT_REFRESH_SECRET);
  } catch (_) {
    return Response.json(
      {
        message: "UNAUTHORIZED",
        code: 401,
      },
      { status: 401 },
    );
  }

  const payload = getPayload<JWTPayload>(accessToken);

  if (payload?.exp === undefined) {
    return Response.json(
      {
        message: "INVALID_TOKEN",
        code: 400,
      },
      { status: 400 },
    );
  }

  const isFiveMinutesBeforeExp = dayjs(payload.exp * 1000)
    .subtract(5, "minute")
    .isBefore(dayjs());

  if (!isFiveMinutesBeforeExp) {
    return Response.json(
      {
        message: "TOKEN_STILL_VALID",
        code: 200,
      },
      { status: 200 },
    );
  }

  const newAccessToken = await signJwt(payload, env.JWT_SECRET);

  const newRefreshToken = await signJwt(
    { uid: payload.uid },
    env.JWT_REFRESH_SECRET,
  );

  setHTTPOnlyCookie("access_token", newAccessToken);
  setHTTPOnlyCookie("refresh_token", newRefreshToken);

  return Response.json(
    {
      message: "SUCCESS",
      code: 200,
    },
    { status: 200 },
  );
};
