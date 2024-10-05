"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";

const userInfo = [
  {
    title: "ชื่อ",
    value: "นางสาววิมุดากร กิจเตชะพานิช",
  },
  {
    title: "วัน เดือน ปีเกิด",
    value: "25 กุมภาพันธ์ พ.ศ. 2547",
  },
  {
    title: "อีเมล",
    value: "vimudakorn.k@gmail.com",
  },
  {
    title: "เบอร์ติดต่อ",
    value: "0824515541",
  },
];

const companyInfo = [
  {
    title: "ชื่อหน่วยงาน",
    value: "Test",
    type: "text",
  },
  {
    title: "ประเภทหน่วยงาน",
    value: "Test",
    type: "text",
  },
  {
    title: "หมวดหมู่ของหน่วยงาน",
    value: "Test",
    type: "text",
  },
  {
    title: "เลขประจำตัวผู้เสียภาษี",
    value: "3053796815990",
    type: "text",
  },
  {
    title: "หนังสือคำร้อง",
    value: "A4.pdf",
    href: "https://www.google.com/",
    type: "link",
  },
];

function VerifyPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleOnSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
    router.push("/hr/onboarding/waiting");
  };
  return (
    <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <h5 className="text-2xl font-medium">ตรวจสอบข้อมูล</h5>
      <div className="flex justify-between items-center mt-8">
        <h6 className="text-lg font-medium">ข้อมูลส่วนตัว</h6>
        <Link
          href="/hr/onboarding/user-info"
          className="text-primary underline"
        >
          แก้ไข
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {userInfo.map(({ title, value }) => (
          <h6 key={title}>
            {title} <span className="font-medium">{value}</span>
          </h6>
        ))}
      </div>
      <div className="border-t border-black my-4" />
      <div className="flex justify-between items-center">
        <h6 className="text-lg font-medium">ข้อมูลหน่วยงาน</h6>
        <Link
          href="/hr/onboarding/company/create"
          className="text-primary underline"
        >
          แก้ไข
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {companyInfo.map(({ title, value, type, href }) => (
          <h6 key={title}>
            {title}{" "}
            {type === "link" ? (
              <a
                {...{ href }}
                target="_blank"
                className="font-medium underline"
              >
                {value}
              </a>
            ) : (
              <span className="font-medium">{value}</span>
            )}{" "}
          </h6>
        ))}
      </div>
      <Button
        onClick={handleOnSave}
        isLoading={isSaving}
        className="w-full h-10 mt-4"
      >
        บันทึกข้อมูล
      </Button>
    </motion.div>
  );
}

export default VerifyPage;
