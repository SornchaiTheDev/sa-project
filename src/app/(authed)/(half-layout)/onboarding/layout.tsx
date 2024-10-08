import { redirect } from "next/navigation";
import React from "react";
import { StudentRepository } from "~/backend/repositories/studentRepository";
import { getUserInfo } from "~/lib/getUserInfo";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getUserInfo();

  const studentRepo = new StudentRepository();

  const hasCompleteForm = await studentRepo.hasCompletedForm(userInfo.uid);

  if (hasCompleteForm) {
    redirect("/");
  }
  return children;
}
