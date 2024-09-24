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
import { useState } from "react";
import { useRouter } from "next/navigation";

function HRInfoForm() {
  const form = useForm<HRInfo>({
    resolver: zodResolver(hrInfo),
    defaultValues: {
      prefix: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleOnSubmit = (data: HRInfo) => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000);
    router.push("/hr/onboarding/company");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <FormField
          control={form.control}
          name="prefix"
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
          name="lastName"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="font-normal">นามสกุล</FormLabel>
              <Input
                className="h-12 bg-zinc-100"
                {...field}
                placeholder="นามสกุล"
                type="password"
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
                type="password"
                placeholder="เบอร์ติดต่อ"
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
          บันทึกข้อมูล
        </Button>
      </form>
    </Form>
  );
}

export default HRInfoForm;
