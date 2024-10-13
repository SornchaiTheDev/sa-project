"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { companyInfo, type CompanyInfo } from "../schemas/company-info-schema";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAtom } from "jotai";
import { hrSignUpAtom } from "~/app/hr/auth/store/hr-sign-up-store";
import axios from "axios";
import { DBDData } from "~/types/dbdData";
import { ApprovedCompany } from "~/types/approvedCompany";
import _ from "lodash";
import dynamic from "next/dynamic";
import { companyCategories } from "~/__mocks__/company-categories";

const UploadFile = dynamic(() => import("~/components/upload-file"), {
  ssr: false,
});

const checkTaxId = async (taxId: string) => {
  if (taxId.length !== 13) return;
  try {
    const res = await axios.get<DBDData>(
      `https://openapi.dbd.go.th/api/v1/juristic_person/${taxId}`,
    );

    if (res.data.status.code === "1000") {
      return true;
    }
  } catch (err) {
    throw new Error("Not found");
  }
};

const checkAlreadyRegistered = async (taxId: string) => {
  if (taxId.length !== 13) return;
  try {
    const res = await axios.get<{ company: ApprovedCompany | null }>(
      `/api/hr/validate/company/${taxId}`,
    );
    return res.data.company !== null;
  } catch (err) {
    throw new Error("Not found");
  }
};

function CompanyInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [
    { type, name, taxId, category, bookUrl, logoUrl, address },
    setSignUpData,
  ] = useAtom(hrSignUpAtom);

  const form = useForm<CompanyInfo>({
    resolver: zodResolver(companyInfo),
    defaultValues: {
      type,
      name,
      address,
      taxId,
      category,
      bookUrl,
      logoUrl,
    },
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const router = useRouter();

  const checkPrivateCompany = async (taxId: string) => {
    const isFound = await checkTaxId(taxId);
    if (isFound) {
      setSignUpData((prev) => ({ ...prev, isVerified: true }));
    }
  };

  const checkGovernmentCompany = (taxId: string) => {
    const isValid = taxId.startsWith("0994000");
    if (isValid) {
      setSignUpData((prev) => ({ ...prev, isVerified: true }));
    }
  };

  const handleOnSubmit = async (formData: CompanyInfo) => {
    try {
      setIsSubmitting(true);

      const isExists = await checkAlreadyRegistered(formData.taxId);
      if (isExists) {
        form.setError("taxId", {
          type: "custom",
          message: "เลขประจำตัวผู้เสียภาษีนี้ถูกใช้ไปแล้ว",
        });
        return;
      }

      if (formData.type === "private") {
        await checkPrivateCompany(formData.taxId);
      } else if (formData.type === "government") {
        checkGovernmentCompany(formData.taxId);
      }

      setSignUpData((prev) => ({ ...prev, ...formData }));
      router.push("/hr/onboarding/verify");
    } catch (err) {
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full"
    >
      <h4 className="text-2xl font-medium mb-10">ลงทะเบียนบริษัท</h4>
      <h5 className="text-xl font-medium mb-4">เกี่ยวกับบริษัท</h5>

      <h6 className="mt-4">บริษัทของคุณลงทะเบียนในระบบอยู่แล้วหรือไม่</h6>
      <Form {...form}>
        <form
          className="flex flex-col"
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <FormItem className="mb-4">
                {isHydrated && (
                  <RadioGroup
                    className="flex gap-20 mt-2"
                    defaultValue="none"
                    value={value}
                    onValueChange={(v: CompanyInfo["type"]) => onChange(v)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="government" id="government" />
                      <Label htmlFor="government">รัฐบาล</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">เอกชน</Label>
                    </div>
                  </RadioGroup>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">ชื่อบริษัท</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="ชื่อบริษัท"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">ที่อยู่บริษัท</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="ที่อยู่บริษัท"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">
                  เลขประจำตัวผู้เสียภาษี
                </FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="กรุณากรอกเลขประจำตัวผู้เสียภาษี"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">ประเภทบริษัท</FormLabel>
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="h-12 bg-zinc-100">
                    {isHydrated && (
                      <SelectValue placeholder="โปรดเลือกหมวดหมู่ของหน่วยงาน" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companyCategories.map(({ name, id }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logoUrl"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">
                  อัปโหลดสัญลักษณ์หน่วยงาน
                </FormLabel>
                <UploadFile
                  maxFiles={1}
                  accept={{
                    "image/*": [],
                  }}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookUrl"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">
                  อัปโหลดหนังสือยื่นคำร้อง
                </FormLabel>
                <UploadFile
                  maxFiles={1}
                  accept={{
                    "image/*": [".png", ".jpg", ".jpeg"],
                    "application/pdf": [".pdf"],
                  }}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            isLoading={isSubmitting}
            variant="ghost"
            className="flex gap-2 items-center mt-10 hover:text-zinc-500 self-end"
          >
            <span>ถัดไป</span>
            <ChevronRight size="1rem" />
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}

export default CompanyInfoForm;
