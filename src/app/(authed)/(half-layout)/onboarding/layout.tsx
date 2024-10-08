import { redirect } from "next/navigation";
import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAlreadyMember = false;
  if (isAlreadyMember) redirect("/");
  return children;
}
