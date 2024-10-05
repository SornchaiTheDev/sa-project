"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

type Selected = "already-has" | "not-yet" | "none";

function HRSignUpPage() {
  const [selected, setSelected] = useState<Selected>("none");
  const [companyName, setCompanyName] = useState<string>("");

  const router = useRouter();

  const handleNext = () => {
    if (selected === "already-has") {
      router.push("verify");
    } else if (selected === "not-yet") {
      router.push("company/create");
    }
  };

  return (
    <>
      <Link
        href="../onboarding/user-info/"
        className="flex gap-2 items-center hover:text-zinc-500 top-4 left-4 absolute"
      >
        <ChevronLeft size="1rem" />
        <span>กลับ</span>
      </Link>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full flex flex-col"
      >
        <h4 className="text-2xl font-medium mb-10">ลงทะเบียนผู้ใช้</h4>
        <p className="text-sm text-zinc-800">ขั้นตอนที่ 2 / 2</p>
        <h5 className="text-xl font-medium">ข้อมูลบริษัท</h5>
        <h6 className="mt-4">บริษัทของคุณลงทะเบียนในระบบอยู่แล้วหรือไม่</h6>
        <RadioGroup
          className="flex gap-20 mt-2"
          defaultValue="none"
          value={selected}
          onValueChange={(v: Selected) => setSelected(v)}
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
        <AnimatePresence>
          {selected === "already-has" && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-4 space-y-2"
            >
              <Label className="text-sm">ชื่อบริษัท</Label>
              <Input
                className="bg-zinc-100 h-12"
                placeholder="Company's name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={handleNext}
          variant="ghost"
          className="flex gap-2 items-center float-end mt-10 hover:text-zinc-500 self-end"
        >
          <span>ถัดไป</span>
          <ChevronRight size="1rem" />
        </Button>
      </motion.div>
    </>
  );
}

export default HRSignUpPage;
