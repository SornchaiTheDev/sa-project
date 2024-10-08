import { cookies } from "next/headers";
import axios from "axios";
import { env } from "~/configs/env";
import { signJwt } from "~/lib/jwt";
import { redirect } from "next/navigation";
import { UserInfo } from "~/types/userInfo";
import {
  KU_ALL_LOGIN_TOKEN_ENDPOINT,
  KU_ALL_LOGIN_USER_INFO_URI,
} from "~/constants/allLogin";
import { setHTTPOnlyCookie } from "~/lib/cookies";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

export interface UserInfoResponse {
  "faculty-id": string;
  sub: string;
  "google-mail": string;
  preferred_username: string;
  "office365-mail": string;
  locale: string;
  faculty: string;
  uid: string;
  idcode: string;
  givenname: string;
  surname: string;
  thaiprename: string;
  "advisor-id": string;
  "last-name": string;
  "major-id": string;
  email_verified: boolean;
  campus: string;
  degree: string;
  cn: string;
  given_name: string;
  "first-name": string;
  userprincipalname: string;
  "type-person": string;
  thainame: string;
  name: string;
  family_name: string;
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
      KU_ALL_LOGIN_TOKEN_ENDPOINT,
      tokenParams,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const { data: userRes } = await axios.get<UserInfoResponse>(
      KU_ALL_LOGIN_USER_INFO_URI,
      {
        headers: {
          Authorization: `Bearer ${tokenRes.access_token}`,
        },
      },
    );

    const payload: UserInfo = {
      facultyId: userRes["faculty-id"],
      sub: userRes.sub,
      googleMail: userRes["google-mail"],
      preferredUsername: userRes.preferred_username,
      office365Mail: userRes["office365-mail"],
      locale: userRes.locale,
      faculty: userRes.faculty,
      uid: userRes.uid,
      idCode: userRes.idcode,
      enFirstName: userRes.givenname,
      enSurName: userRes.surname,
      enFullName: userRes.name,
      thaiPreName: userRes.thaiprename,
      thFirstName: userRes["first-name"],
      thSurName: userRes["last-name"],
      thFullName: userRes.thainame,
      advisorId: userRes["advisor-id"],
      lastName: userRes["last-name"],
      majorId: userRes["major-id"],
      emailVerified: userRes.email_verified,
      campus: userRes.campus,
      degree: userRes.degree,
      cn: userRes.cn,
      userPrincipalName: userRes.userprincipalname,
      typePerson: userRes["type-person"],
    };

    // const accountYear = parseInt(payload.idCode.slice(0, 2));
    //
    // const currentYear = parseInt(dayjs().format("BBBB").slice(2, 4));
    // Check if current student
    // if (currentYear - accountYear > 4) {
    //   return Response.json(
    //     {
    //       message: "INVALID_ACCOUNT_YEAR",
    //       code: 400,
    //     },
    //     { status: 400 },
    //   );
    // }

    const accessToken = await signJwt(payload, env.JWT_SECRET);
    const refreshToken = await signJwt(
      { uid: userRes.uid },
      env.JWT_REFRESH_SECRET,
    );

    cookies().delete("state");
    cookies().delete("code_verifier");

    setHTTPOnlyCookie("access_token", accessToken);
    setHTTPOnlyCookie("refresh_token", refreshToken);
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

  redirect(env.WEB_URL + "/api/auth/check");
};
