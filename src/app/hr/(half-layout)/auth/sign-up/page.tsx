import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import HRSignUpForm from "./_components/HRSignUpForm";

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
      <div className="w-full">
        <h5 className="text-xl text-center font-medium">ลงทะเบียนผู้ใช้</h5>
        <HRSignUpForm />
      </div>
      <h6 className="text-sm text-zinc-700 mt-2">
        ฉันมีบัญชีอยู่แล้ว{" "}
        <Link href="/hr/auth/sign-in" className="text-zinc-900 font-medium">
          เข้าสู่ระบบ
        </Link>
      </h6>
    </div>
  );
}

export default SignUpPage;
