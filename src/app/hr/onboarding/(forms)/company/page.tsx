"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { ChevronLeft, ChevronRight, CircleDashed, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ApprovedCompany } from "~/types/approvedCompany";
import { createJobAnnouncer } from "./apiFns/createJobAnnouncer";
import { useAtomValue } from "jotai";
import { hrSignUpAtom } from "~/app/hr/auth/store/hr-sign-up-store";
import { toast } from "sonner";

type Selected = "already-has" | "not-yet" | "none";

const getCompanies = async (name: string) => {
  if (name.length === 0) return [];
  const res = await axios.get<{ companies: ApprovedCompany[] }>(
    `/api/companies?search=${name}`,
  );
  return res.data.companies;
};

function HRSignUpPage() {
  const [selected, setSelected] = useState<Selected>("none");
  const [companyName, setCompanyName] = useState<string>("");
  const [companies, setCompanies] = useState<ApprovedCompany[]>([]);
  const [selectedCompany, setSelectedCompany] =
    useState<ApprovedCompany | null>(null);

  const createJobA = useMutation({
    mutationFn: createJobAnnouncer,
    onSuccess: () => {
      router.push("verify");
    },
    onError: () => toast.error("เกิดข้อผิดพลาดในการสร้างบัญชี"),
  });

  const router = useRouter();

  const { username, title, password, email, phone, firstName, lastName } =
    useAtomValue(hrSignUpAtom);

  const handleNext = () => {
    if (selected === "already-has") {
      if (!selectedCompany) return;
      createJobA.mutate({
        username,
        title,
        password,
        email,
        phoneNumber: phone,
        companyId: selectedCompany.id,
        firstName,
        lastName,
      });
    } else if (selected === "not-yet") {
      router.push("company/create");
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const debouncedGetCompanies = useMemo(
    () =>
      _.debounce(async (name: string) => {
        try {
          const companies = await getCompanies(name);
          setCompanies(companies);
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [],
  );

  const handleSelectCompany = (company: ApprovedCompany) => {
    setCompanyName(company.name);
    setSelectedCompany(company);
  };

  useEffect(() => {
    setIsLoading(true);
    debouncedGetCompanies(companyName);
  }, [companyName, debouncedGetCompanies]);

  const isSameName = selectedCompany?.name === companyName;

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
              <Popover open={companyName.length > 0 && !isSameName}>
                <PopoverTrigger className="block w-full">
                  <Input
                    className="bg-zinc-100 h-12"
                    placeholder="Company's name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </PopoverTrigger>
                <PopoverContent
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  className="w-[--radix-popper-anchor-width] p-2 overflow-y-auto max-h-24"
                  align="start"
                >
                  {isLoading ? (
                    <div className="flex flex-col gap-2 justify-center items-center h-full">
                      <Loader />
                      <h6 className="text-sm">กำลังโหลด...</h6>
                    </div>
                  ) : companies.length === 0 ? (
                    <div className="flex flex-col gap-2 justify-center items-center h-full">
                      <CircleDashed />
                      <h6 className="text-sm">ไม่มีบริษัทนี้</h6>
                    </div>
                  ) : (
                    <ul>
                      {companies.map((company) => (
                        <li
                          key={company.id}
                          className="hover:bg-zinc-100 p-3 text-sm rounded-lg"
                        >
                          <button
                            onClick={() => handleSelectCompany(company)}
                            className="w-full text-start"
                          >
                            {company.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </PopoverContent>
              </Popover>
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
