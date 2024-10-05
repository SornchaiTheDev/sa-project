"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
import UploadFile from "~/components/upload-file";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const jobCategories: { name: string; id: string }[] = [
  {
    name: "เกษตรกรรม",
    id: "agriculture",
  },
  {
    name: "สัตว์เลี้ยง",
    id: "animal-husbandry",
  },
];

function CompanyInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CompanyInfo>({
    resolver: zodResolver(companyInfo),
    defaultValues: {
      type: "none",
      name: "",
      taxId: "",
      category: "",
      bookUrl: [],
    },
  });

  const router = useRouter();

  const handleOnSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/hr/onboarding/verify");
    }, 2000);
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
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            control={form.control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <FormItem className="mb-4">
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
                    <SelectValue placeholder="โปรดเลือกหมวดหมู่ของหน่วยงาน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {jobCategories.map(({ name, id }) => (
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
            name="bookUrl"
            render={({ field: { onChange } }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">
                  อัปโหลดหนังสือยื่นคำร้อง
                </FormLabel>
                <UploadFile
                  maxFiles={1}
                  onChange={onChange}
                  accept={{
                    "image/*": [".png", ".jpg", ".jpeg"],
                    "application/pdf": [".pdf"],
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting || !form.formState.isValid}
            isLoading={isSubmitting}
            variant="ghost"
            className="flex gap-2 items-center float-end mt-10 hover:text-zinc-500 self-end"
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
