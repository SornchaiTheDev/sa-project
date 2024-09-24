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
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function HRSignUpForm() {
  const form = useForm<HRSignUpSchema>({
    resolver: zodResolver(hrSignUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleOnSubmit = (data: HRSignUpSchema) => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000);
    router.push("/hr/onboarding/user-info");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
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
              <FormMessage />
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full mt-2 h-10"
        >
          ลงทะเบียน
        </Button>
      </form>
      <h6 className="text-sm text-zinc-700 mt-2">
        ฉันมีบัญชีอยู่แล้ว{" "}
        <Link href="/hr/auth/sign-in" className="text-zinc-900 font-medium">
          เข้าสู่ระบบ
        </Link>
      </h6>
    </Form>
  );
}

export default HRSignUpForm;
