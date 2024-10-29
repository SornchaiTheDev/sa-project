import axios, { AxiosError } from "axios";
import CreateAnnouncementClient from "./client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { env } from "~/configs/env";

export default async function MyAnnouncementPage() {
  let isSuspensed = false;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axios.get(`${env.WEB_URL}/api/hr/validate/isSuspense`, {
      headers: {
        Cookie: "access_token=" + accessToken,
      },
    });
    if (res.data.code === "SUSPENSED") {
      isSuspensed = true;
    }
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 401) {
      redirect("/hr/auth/sign-in");
    }
  }

  return <CreateAnnouncementClient {...{ isSuspensed }} />;
}
