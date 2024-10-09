"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { hrSignUpSchema, HRSignUpSchema } from "../schemas/hr-signup-schema";
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
import PasswordRequirements from "./PasswordRequirements";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { hrSignUpAtom } from "../store/hr-sign-up-store";

function HRSignUpForm() {
  const [{ email, username, password, confirmPassword }, setSignUpData] =
    useAtom(hrSignUpAtom);
  const form = useForm<HRSignUpSchema>({
    resolver: zodResolver(hrSignUpSchema),
    defaultValues: {
      email,
      username,
      password,
      confirmPassword,
    },
  });

  const router = useRouter();

  const handleOnSubmit = (data: HRSignUpSchema) => {
    setSignUpData((prev) => ({ ...prev, data }));
    router.push("/hr/onboarding/user-info");
  };

  return (
    <div className="w-full">
      <motion.h5
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xl text-center font-medium"
      >
        ลงทะเบียนผู้ใช้
      </motion.h5>
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
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">ชื่อผู้ใช้</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="ชื่อผู้ใช้"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">รหัสผ่าน</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="รหัสผ่าน"
                  type="password"
                />
                <PasswordRequirements password={form.watch("password")} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">ยืนยันรหัสผ่าน</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="ghost"
            className="flex gap-2 items-center float-end hover:text-zinc-500 self-end"
          >
            <span>ถัดไป</span>
            <ChevronRight size="1rem" />
          </Button>
        </motion.form>
      </Form>
    </div>
  );
}

export default HRSignUpForm;
