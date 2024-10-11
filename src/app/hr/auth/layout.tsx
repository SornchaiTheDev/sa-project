import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { env } from "~/configs/env";
import HalfImageLayout from "~/layouts/HalfImageLayout";
import { verifyJwt } from "~/lib/jwt";

export default async function HRLayout({ children }: { children: ReactNode }) {
  const accessToken = cookies().get("access_token")?.value;

  if (accessToken !== undefined) {
    let isValid = false;
    try {
      await verifyJwt(accessToken, env.JWT_SECRET);
      isValid = true;
    } catch (_) {}
    if (isValid) redirect("/hr");
  }

  return <HalfImageLayout>{children}</HalfImageLayout>;
}
