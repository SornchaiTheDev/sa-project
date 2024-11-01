"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { ApprovedCompany } from "~/types/approvedCompany";
import dynamic from "next/dynamic";
import { companyCategories } from "~/__mocks__/company-categories";
import { useQuery } from "@tanstack/react-query";
import { getProvinces } from "~/globalQueryFns/getProvinces";
import { getAmphures } from "~/globalQueryFns/getAmphures";
import { getTambons } from "~/globalQueryFns/getTambons";

const UploadFile = dynamic(() => import("~/components/upload-file"), {
  ssr: false,
});

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
    {
      type,
      name,
      taxId,
      category,
      bookUrl,
      logoUrl,
      place,
      province,
      amphur,
      tambon,
    },
    setSignUpData,
  ] = useAtom(hrSignUpAtom);

  const form = useForm<CompanyInfo>({
    resolver: zodResolver(companyInfo),
    defaultValues: {
      type,
      name,
      place,
      taxId,
      category,
      bookUrl,
      logoUrl,
      province,
      amphur,
      tambon,
    },
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const router = useRouter();

  const checkPrivateCompany = async (taxId: string) => {
    const { data } = await axios.get<{ isValid: boolean }>(
      `/api/companies/validate/${taxId}`,
    );

    if (data.isValid) {
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

  const provinces = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });

  const formProvince = form.watch("province");
  const formAmphur = form.watch("amphur");

  const amphures = useQuery({
    queryKey: ["amphures"],
    queryFn: () => getAmphures(formProvince),
    enabled: formProvince !== "",
  });

  const tambons = useQuery({
    queryKey: ["tambons"],
    queryFn: () => getTambons(formAmphur),
    enabled: formAmphur !== "",
  });

  useEffect(() => {
    if (formProvince !== "") {
      amphures.refetch();
    }

    if (formAmphur !== "") {
      tambons.refetch();
    }
  }, [form, amphures, tambons, formProvince, formAmphur]);

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
            name="place"
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
          <div className="flex gap-2 mb-4">
            <FormField
              control={form.control}
              name="province"
              render={({ field: { value, onChange } }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-normal">จังหวัด</FormLabel>
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="h-12 bg-zinc-100">
                      {isHydrated && (
                        <SelectValue placeholder="โปรดเลือกจังหวัด" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {provinces.data?.map(({ id, name }) => (
                          <SelectItem key={id} value={name}>
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
              name="amphur"
              render={({ field: { value, onChange } }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-normal">เขต/อำเภอ</FormLabel>
                  <Select
                    disabled={formProvince === ""}
                    onValueChange={onChange}
                    value={value}
                  >
                    <SelectTrigger className="h-12 bg-zinc-100">
                      {isHydrated && (
                        <SelectValue placeholder="โปรดเลือกอำเภอ" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {amphures.data?.map(({ id, name }) => (
                          <SelectItem key={id} value={name}>
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
              name="tambon"
              render={({ field: { value, onChange } }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-normal">แขวง/ตำบล</FormLabel>
                  <Select
                    disabled={formAmphur === ""}
                    onValueChange={onChange}
                    value={value}
                  >
                    <SelectTrigger className="h-12 bg-zinc-100">
                      {isHydrated && (
                        <SelectValue placeholder="โปรดเลือกตำบล" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {tambons.data?.map(({ id, name }) => (
                          <SelectItem key={id} value={name}>
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
          </div>
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
                  uploadApiEndpoint="/api/hr/register/company/upload/logo"
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
                  uploadApiEndpoint="/api/hr/register/company/upload/book"
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
            className="flex gap-2 items-center hover:text-zinc-500 self-end"
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
