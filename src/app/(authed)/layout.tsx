import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { getPayload } from "~/lib/jwt";
import SessionWrapper from "~/wrapper/SessionWrapper";

export default function NisitAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("access_token")?.value;

  if (accessToken === undefined) {
    return redirect("/auth/sign-in");
  }

  const userInfo = getPayload(accessToken);

  return <SessionWrapper {...{ userInfo }}>{children}</SessionWrapper>;
}
