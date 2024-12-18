import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload, verifyJwt } from "./jwt";
import { env } from "~/configs/env";
import type { UserInfo } from "~/types/userInfo";

export const getUserInfo = async () => {
  const accessToken = cookies().get("access_token")?.value;

  if (accessToken === undefined) {
    return redirect("/auth/sign-in");
  }

  try {
    await verifyJwt(accessToken, env.JWT_SECRET);
  } catch (_) {
    return redirect("/auth/sign-in");
  }

  const userInfo = getPayload<UserInfo>(accessToken);

  return userInfo;
};
