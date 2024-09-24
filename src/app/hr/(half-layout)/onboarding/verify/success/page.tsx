"use client";
import { CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

function VerifySuccessPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h5 className="text-xl font-medium">ตรวจสอบสำเร็จ</h5>
        <h6>บริษัทของคุณผ่านการอนุมัติ</h6>
        <CheckCircleIcon size="3rem" className="text-green-500" />
      </div>
      <Button onClick={() => router.push("/hr")} className="w-[50%] mt-8 h-12">
        เริ่มต้นใช้งาน
      </Button>
    </>
  );
}

export default VerifySuccessPage;
