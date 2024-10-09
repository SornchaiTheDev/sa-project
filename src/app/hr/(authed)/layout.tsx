import React from "react";
import HRSessionWrapper from "~/wrapper/HRSessionWrapper";
import { HRInfo } from "~/types/hrInfo";

function HRAuthedLayout({ children }: { children: React.ReactNode }) {
  const hrInfo: HRInfo = {
    username: "username",
    title: "title",
    firstName: "firstName",
    lastName: "lastName",
    isActive: false,
    companyId: "companyId",
    phoneNumber: "",
  };
  return <HRSessionWrapper {...{ hrInfo }}>{children}</HRSessionWrapper>;
}

export default HRAuthedLayout;
