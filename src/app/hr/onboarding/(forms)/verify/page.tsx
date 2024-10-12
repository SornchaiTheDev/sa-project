"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  hrSignUpAtom,
  HRSignUpStore,
  resetHrSignUpAtom,
} from "~/app/hr/auth/store/hr-sign-up-store";
import { Button } from "~/components/ui/button";

export const dynamic = "force-dynamic";

const generateUserInfo = (signUp: HRSignUpStore) => {
  const { firstName, lastName, email, phone } = signUp;
  return [
    {
      title: "ชื่อ",
      value: firstName + " " + lastName,
    },
    {
      title: "อีเมล",
      value: email,
    },
    {
      title: "เบอร์ติดต่อ",
      value: phone,
    },
  ];
};

const mapType = (type: string) => {
  if (type === "government") return "รัฐบาล";
  if (type === "private") return "เอกชน";
};

const generateCompanyInfo = (signUp: HRSignUpStore) => {
  const { name, type, category, taxId, bookUrl, logoUrl, address } = signUp;
  if (bookUrl.length === 0 || logoUrl.length === 0) return [];

  return [
    {
      title: "ชื่อหน่วยงาน",
      value: name,
      type: "text",
    },
    {
      title: "ที่อยู่หน่วยงาน",
      value: address,
      type: "text",
    },
    {
      title: "ประเภทหน่วยงาน",
      value: mapType(type),
      type: "text",
    },
    {
      title: "หมวดหมู่ของหน่วยงาน",
      value: category,
      type: "text",
    },
    {
      title: "เลขประจำตัวผู้เสียภาษี",
      value: taxId,
      type: "text",
    },
    {
      title: "สัญลักษณ์หน่วยงาน",
      value: logoUrl[0].name,
      href: logoUrl[0].url,
      type: "link",
    },
    {
      title: "หนังสือคำร้อง",
      value: bookUrl[0].name,
      href: bookUrl[0].url,
      type: "link",
    },
  ];
};

function VerifyPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = useAtomValue(hrSignUpAtom);

  const userInfo = useMemo(() => generateUserInfo(signUp), [signUp]);
  const companyInfo = useMemo(() => generateCompanyInfo(signUp), [signUp]);

  const isCreateNewCompany = signUp.name.length !== 0;

  const handleOnSave = async () => {
    setIsSaving(true);
    try {
      if (isCreateNewCompany) {
        await axios.post("/api/hr/register/company", signUp);
      } else {
        await axios.post("/api/hr/register", signUp);
      }
      toast.success("บันทึกข้อมูลสำเร็จ");
      router.push("/hr/onboarding/waiting");
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
          <div className="flex items-center gap-2" key={title}>
            <h6 className="min-w-40">{title}</h6>
            <h6 className="font-medium">
              {isLoading ? "กำลังโหลด..." : value}
            </h6>
          </div>
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
          <div className="flex gap-2" key={title}>
            <h6 className="min-w-40">{title}</h6>
            {type === "link" ? (
              <a
                {...{ href }}
                target="_blank"
                className="font-medium underline"
              >
                {isLoading ? "กำลังโหลด..." : value}
              </a>
            ) : (
              <p className="font-medium">
                {isLoading ? "กำลังโหลด..." : value}
              </p>
            )}
          </div>
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
