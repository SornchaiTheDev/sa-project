"use client";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("verify/success"), 2000);
  }, [router]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h5 className="text-xl font-medium">กำลังตรวจสอบข้อมูลบริษัท</h5>
      <h6>กรุณารอสักครู่</h6>
      <LoaderIcon size="3rem" className="animate-spin" />
    </div>
  );
}

export default VerifyPage;
