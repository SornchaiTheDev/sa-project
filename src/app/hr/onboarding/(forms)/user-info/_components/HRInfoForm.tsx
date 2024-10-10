"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { hrInfo, HRInfo } from "../schemas/hr-info-schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { hrSignUpAtom } from "~/app/hr/auth/store/hr-sign-up-store";
import axios from "axios";
import { useEffect, useState } from "react";

const isEmailExists = async (email: string) => {
  try {
    const res = await axios.get<{ status: "EMAIL_EXISTS" | "AVAILABLE" }>(
      `/api/hr/validate/email/${email.replaceAll(/\//g, "%2F").replaceAll(/\\/g, "%5C")}`,
    );

    return res.data.status === "EMAIL_EXISTS";
  } catch (err) {
    throw err;
  }
};

function HRInfoForm() {
  const [{ email, title, firstName, surName, phone }, setSignUpData] =
    useAtom(hrSignUpAtom);
  const form = useForm<HRInfo>({
    resolver: zodResolver(hrInfo),
    defaultValues: {
      email,
      title,
      firstName,
      surName,
      phone,
    },
  });

  const router = useRouter();

  const handleOnSubmit = async (data: HRInfo) => {
    try {
      const isExists = await isEmailExists(data.email);
      if (isExists) {
        form.setError("email", {
          type: "custom",
          message: "อีเมลนี้ถูกใช้ไปแล้ว",
        });
        return;
      }
      setSignUpData((prev) => ({ ...prev, ...data }));
      router.push("/hr/onboarding/company");
    } catch (err) {}
  };

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <motion.h4
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl font-medium mb-10"
      >
        ลงทะเบียนผู้ใช้
      </motion.h4>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <p className="text-sm text-zinc-400">ขั้นตอนที่ 1 / 2</p>
        <h5 className="text-xl font-medium mb-4">ข้อมูลผู้ใช้</h5>
      </motion.div>
      <Form {...form}>
        <motion.form
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">อีเมล</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="อีเมล"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">คำนำหน้า</FormLabel>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full h-12 bg-zinc-100">
                    {isHydrated && <SelectValue placeholder="คำนำหน้า" />}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      โปรดเลือกคำนำหน้า
                    </SelectItem>
                    <SelectItem value="นาย">นาย</SelectItem>
                    <SelectItem value="นางสาว">นางสาว</SelectItem>
                    <SelectItem value="นาง">นาง</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">ชื่อ</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="ชื่อ"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">นามสกุล</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="นามสกุล"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">เบอร์ติดต่อ</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  placeholder="เบอร์ติดต่อ"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="ghost"
            isLoading={form.formState.isSubmitting}
            className="flex gap-2 items-center float-end hover:text-zinc-500 self-end"
          >
            <span>ถัดไป</span>
            <ChevronRight size="1rem" />
          </Button>
        </motion.form>
      </Form>
    </>
  );
}

export default HRInfoForm;
