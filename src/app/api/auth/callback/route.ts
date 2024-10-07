import { cookies } from "next/headers";
import axios from "axios";
import { env } from "~/configs/env";
import { signJwt } from "~/lib/jwt";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { UserInfo } from "~/types/userInfo";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

const isSameState = (cookie: string, state: string) => {
  return cookie === state;
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const state = searchParams.get("state");
  const code = searchParams.get("code");

  const cookieState = cookies().get("state")?.value;
  const codeVerifier = cookies().get("code_verifier")?.value;

  if (
    code === null ||
    state === null ||
    codeVerifier === undefined ||
    cookieState === undefined
  ) {
    return Response.json(
      {
        message: "Invalid request",
        code: 400,
      },
      { status: 400 },
    );
  }

  if (!isSameState(cookieState, state)) {
    return Response.json(
      {
        message: "Invalid state",
        status: 400,
      },
      { status: 400 },
    );
  }

  const tokenParams = new URLSearchParams();
  tokenParams.append("grant_type", "authorization_code");
  tokenParams.append("code", code);
  tokenParams.append("redirect_uri", env.KU_ALL_LOGIN_REDIRECT_URI);
  tokenParams.append("code_verifier", codeVerifier);

  const basicAuth = Buffer.from(
    `${env.KU_ALL_LOGIN_CLIENT_ID}:${env.KU_ALL_LOGIN_CLIENT_SECRET}`,
  ).toString("base64");

  try {
    const { data: tokenRes } = await axios.post<TokenResponse>(
      env.KU_ALL_LOGIN_TOKEN_ENDPOINT,
      tokenParams,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const { data: userRes } = await axios.get<UserInfo>(
      env.KU_ALL_LOGIN_USER_INFO_URI,
      {
        headers: {
          Authorization: `Bearer ${tokenRes.access_token}`,
        },
      },
    );

    const accessToken = await signJwt(userRes, env.JWT_SECRET);
    const refreshToken = await signJwt(
      { uid: userRes.uid },
      env.JWT_REFRESH_SECRET,
    );

    cookies().delete("state");
    cookies().delete("code_verifier");

    cookies().set("access_token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      expires: dayjs().add(30, "minute").toDate(),
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      expires: dayjs().add(2, "hour").toDate(),
      secure: process.env.NODE_ENV === "production",
    });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: "SOMETHING_WENT_WRONG",
        code: 500,
      },
      { status: 500 },
    );
  }

  return redirect(env.WEB_URL);
};
