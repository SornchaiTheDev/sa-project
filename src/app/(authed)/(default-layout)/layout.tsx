import { type ReactNode } from "react";
import Navbar from "~/components/nav-bar";
import JobAlert from "./_components/JobAlert";
import { StudentRepository } from "~/backend/repositories/studentRepository";
import { getUserInfo } from "~/lib/getUserInfo";
import { redirect } from "next/navigation";

async function AuthedLayout({ children }: { children: ReactNode }) {
  const userInfo = await getUserInfo();
  const studentRepo = new StudentRepository();

  const hasCompleteForm = await studentRepo.hasCompletedForm(userInfo.uid);

  if (!hasCompleteForm) {
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
