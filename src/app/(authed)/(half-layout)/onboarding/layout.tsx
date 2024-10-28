import { redirect } from "next/navigation";
import React from "react";
import { isStudentExists } from "~/backend/models/student-model";
import { getUserInfo } from "~/lib/getUserInfo";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getUserInfo();

  const isCompletedForm = await isStudentExists(userInfo.uid);

  if (isCompletedForm) {
    redirect("/");
  }

  return children;
}
