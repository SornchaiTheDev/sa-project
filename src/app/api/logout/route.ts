import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = () => {
  cookies().delete("access_token");
  cookies().delete("refresh_token");

  redirect("/auth/sign-in");
};
