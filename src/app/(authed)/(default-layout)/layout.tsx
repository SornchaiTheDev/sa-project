import { type ReactNode } from "react";
import Navbar from "~/components/nav-bar";
import { getUserInfo } from "~/lib/getUserInfo";
import { redirect } from "next/navigation";
import { isStudentExists } from "~/backend/models/student-model";

async function AuthedLayout({ children }: { children: ReactNode }) {
  const userInfo = await getUserInfo();

  const isCompletedForm = await isStudentExists(userInfo.uid);

  if (!isCompletedForm) {
    redirect("/onboarding/user-info");
  }

  return (
    <>
      {/* <JobAlert /> */}
      <Navbar />
      {children}
    </>
  );
}

export default AuthedLayout;
