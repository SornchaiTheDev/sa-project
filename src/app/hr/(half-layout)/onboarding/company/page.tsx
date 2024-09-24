"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

function HRSignUpPage() {
  const [selected, setSelected] = useState<string>("none");
  const [companyName, setCompanyName] = useState<string>("");

  return (
    <>
      <Link
        href="../onboarding/user-info/"
        className="flex gap-2 items-center hover:text-zinc-500 top-4 left-4 absolute"
      >
        <ChevronLeft size="1rem" />
        <span>กลับ</span>
      </Link>
      <div className="w-full flex flex-col">
        <h4 className="text-2xl font-medium mb-10">ลงทะเบียนผู้ใช้</h4>
        <p className="text-sm text-zinc-800">ขั้นตอนที่ 2 / 2</p>
        <h5 className="text-xl font-medium">ข้อมูลบริษัท</h5>
        <h6 className="mt-4">บริษัทของคุณลงทะเบียนในระบบอยู่แล้วหรือไม่</h6>
        <RadioGroup
          className="flex gap-20 mt-2"
          defaultValue="none"
          value={selected}
          onValueChange={setSelected}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="already-has" id="already-has" />
            <Label htmlFor="already-has">มีอยู่แล้ว</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-yet" id="not-yet" />
            <Label htmlFor="not-yet">ยังไม่มี</Label>
          </div>
        </RadioGroup>
        {selected === "already-has" && (
          <div className="mt-4 space-y-2">
            <Label className="text-sm">ชื่อบริษัท</Label>
            <Input
              className="bg-zinc-100 h-12"
              placeholder="Company's name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        )}
        <Link
          href="../auth/sign-in/"
          className="flex gap-2 items-center float-end mt-10 hover:text-zinc-500 self-end"
        >
          <span>ถัดไป</span>
          <ChevronRight size="1rem" />
        </Link>
      </div>
    </>
  );
}

export default HRSignUpPage;
