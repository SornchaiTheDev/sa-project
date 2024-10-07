import * as jose from "jose";
import { env } from "~/configs/env";
import { UserInfo } from "~/types/userInfo";

const stringToUint8Array = (str: string) => new TextEncoder().encode(str);

export const signJwt = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>,
  secret: string,
) => {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(env.WEB_URL)
    .setExpirationTime("30m")
    .sign(stringToUint8Array(secret));

  return jwt;
};

export const verifyJwt = async (jwt: string, secret: string) => {
  const isValid = await jose.jwtVerify(jwt, stringToUint8Array(secret));
  return isValid;
};

export const isExpired = (jwt: string) => {
  const { exp } = jose.decodeJwt<UserInfo>(jwt);
  const now = Math.floor(Date.now() / 1000);

  if (exp === undefined) {
    return true;
  }

  return exp < now;
};

export const getPayload = (jwt: string) => {
  return jose.decodeJwt<UserInfo>(jwt);
};
