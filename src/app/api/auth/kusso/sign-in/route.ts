import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "~/configs/env";
import { KU_ALL_LOGIN_AUTHORIZATION_URI } from "~/constants/allLogin";

const base64URLEncode = (str: string) =>
  str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

export const GET = () => {
  const url = new URL(KU_ALL_LOGIN_AUTHORIZATION_URI);
  const searchParams = url.searchParams;

  searchParams.append("response_type", "code");
  searchParams.append("client_id", env.KU_ALL_LOGIN_CLIENT_ID);
  searchParams.append("redirect_uri", env.KU_ALL_LOGIN_REDIRECT_URI);

  const state = randomBytes(16).toString("base64");
  cookies().set("state", state);

  searchParams.append("state", state);

  const codeVerifier = base64URLEncode(randomBytes(64).toString("base64"));
  const codeChallenge = createHash("sha256")
    .update(codeVerifier)
    .digest("base64");

  cookies().set("code_verifier", codeVerifier);

  searchParams.append("code_challenge", base64URLEncode(codeChallenge));
  searchParams.append("code_challenge_method", "S256");

  return redirect(url.toString());
};
