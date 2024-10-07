import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { getPayload, isExpired } from "~/lib/jwt";
import SessionWrapper from "~/wrapper/SessionWrapper";

export default function NisitAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessTokenCookie = cookies().get("access_token");

  const accessToken = accessTokenCookie?.value;

  if (accessToken === undefined || isExpired(accessToken)) {
    console.log("called");
    return redirect("/auth/sign-in");
  }

  const userInfo = getPayload(accessToken);

  return <SessionWrapper {...{ userInfo }}>{children}</SessionWrapper>;
}
