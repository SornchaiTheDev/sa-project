import dayjs from "dayjs";
import { cookies } from "next/headers";
import { env } from "~/configs/env";
import { setHTTPOnlyCookie } from "~/lib/cookies";
import { getPayload, isExpired, signJwt, verifyJwt } from "~/lib/jwt";

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

  const isAccessTokenValid = await verifyJwt(accessToken, env.JWT_SECRET);
  const isRefreshTokenValid = await verifyJwt(
    refreshToken,
    env.JWT_REFRESH_SECRET,
  );

  if (!isAccessTokenValid || !isRefreshTokenValid) {
    return Response.json(
      {
        message: "NOT_AUTHROIZED",
        code: 401,
      },
      { status: 401 },
    );
  }

  if (isExpired(refreshToken)) {
    return Response.json(
      {
        message: "REFRESH_TOKEN_EXPIRED",
        code: 401,
      },
      { status: 401 },
    );
  }

  const payload = getPayload(accessToken);

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
