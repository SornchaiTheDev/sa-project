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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ChevronRight } from "lucide-react";

function HRInfoForm() {
  const form = useForm<HRInfo>({
    resolver: zodResolver(hrInfo),
    defaultValues: {
      prefix: "none",
      firstName: "ศรชัย",
      lastName: "สมสกุล",
      phone: "0987654321",
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
          render={({ field: { value, onChange } }) => (
            <FormItem className="mb-4">
              <FormLabel className="font-normal">คำนำหน้า</FormLabel>
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full h-12 bg-zinc-100">
                  <SelectValue placeholder="คำนำหน้า" />
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
          name="lastName"
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
          className="flex gap-2 items-center float-end hover:text-zinc-500 self-end"
        >
          <span>ถัดไป</span>
          <ChevronRight size="1rem" />
        </Button>
      </form>
    </Form>
  );
}

export default HRInfoForm;
