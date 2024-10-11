import React from "react";
import HRSessionWrapper from "~/wrapper/HRSessionWrapper";
import { HRInfo } from "~/types/hrInfo";
import { getPayload } from "~/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function HRAuthedLayout({ children }: { children: React.ReactNode }) {
  const accessToken = cookies().get("access_token")?.value;
  if (!accessToken) return redirect("/hr/auth/sign-in");

  const hrInfo = getPayload<HRInfo>(accessToken);

  return <HRSessionWrapper {...{ hrInfo }}>{children}</HRSessionWrapper>;
}

export default HRAuthedLayout;
