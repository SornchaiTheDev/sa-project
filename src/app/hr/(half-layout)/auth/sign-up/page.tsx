import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import HRSignUpForm from "./_components/HRSignUpForm";
import AlreadySignUp from "./_components/AlreadySignUp";

function SignUpPage() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <Link
        href="../auth/sign-in/"
        className="flex gap-2 items-center hover:text-zinc-500 absolute top-4 left-4"
      >
        <ChevronLeft size="1rem" />
        <span>กลับ</span>
      </Link>
      <HRSignUpForm />
      <AlreadySignUp />
    </div>
  );
}

export default SignUpPage;
