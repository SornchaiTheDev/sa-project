import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import HRSignUpForm from "./_components/HRSignUpForm";

function SignUpPage() {
  return (
    <>
      <Link
        href="../auth/sign-in/"
        className="flex gap-2 items-center hover:text-zinc-500 absolute top-4 left-4"
      >
        <ChevronLeft size="1rem" />
        <span>กลับ</span>
      </Link>
      <div className="w-full">
        <h5 className="text-xl text-center font-medium">ลงทะเบียนผู้ใช้</h5>
        <HRSignUpForm />
      </div>
    </>
  );
}

export default SignUpPage;
