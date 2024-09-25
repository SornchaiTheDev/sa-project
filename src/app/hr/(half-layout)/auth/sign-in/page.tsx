import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function HRSignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-[400px]">
        <h3 className="text-xl font-medium text-center">เข้าสู่ระบบ</h3>
        <div className="flex flex-col gap-2 mt-4">
          <Label className="text-sm">ชื่อผู้ใช้</Label>
          <Input placeholder="ชื่อผู้ใช้" className="bg-zinc-100 h-12" />
          <Label className="text-sm">รหัสผ่าน</Label>
          <Input placeholder="รหัสผ่าน" className="bg-zinc-100 h-12" />
          <Button className="w-full mt-2 h-10">เข้าสู่ระบบ</Button>
        </div>
        <h6 className="text-sm text-zinc-700 mt-2">
          ฉันยังไ่ม่มีบัญชี{" "}
          <Link href="/hr/auth/sign-up" className="text-zinc-900 font-medium">
            ลงทะเบียน
          </Link>
        </h6>
      </div>
    </div>
  );
}

export default HRSignInPage;
