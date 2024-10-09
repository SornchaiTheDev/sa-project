"use client";
import { useForm } from "react-hook-form";
import { userInfo, UserInfo } from "./schemas/user-info";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import dayjs from "~/lib/dayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { motion } from "framer-motion";
import { useAllLoginSession } from "~/wrapper/AllLoginSessionWrapper";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { useAtom } from "jotai";
import { onboardingAtom } from "../store/onboarding-store";
import dynamic from "next/dynamic";

const DatePicker = dynamic(() => import("~/components/ui/date-picker"), {
  ssr: false,
  loading: () => (
    <div className="items-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-zinc-100 shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 w-full justify-start text-left font-normal flex h-12">
      <CalendarIcon className="mr-2 h-4 w-4" />
      Loading...
    </div>
  ),
});

function UserInfoFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { thaiPreName, thFirstName, thSurName, googleMail } =
    useAllLoginSession();
  const [onboard, setOnboard] = useAtom(onboardingAtom);

  const form = useForm<UserInfo>({
    resolver: zodResolver(userInfo),
    defaultValues: {
      prefix: onboard.prefix.length > 0 ? onboard.prefix : thaiPreName,
      firstName: onboard.firstName.length > 0 ? onboard.firstName : thFirstName,
      surName: onboard.surName.length > 0 ? onboard.surName : thSurName,
      email: onboard.surName.length > 0 ? onboard.email : googleMail,
      bod: new Date(onboard.bod),
      phone: onboard.phone,
    },
  });

  const fromYear = dayjs().add(-25, "year");
  const toYear = fromYear.add(10, "year");

  const router = useRouter();

  const handleOnSubmit = (formData: UserInfo) => {
    setIsSubmitting(true);
    setOnboard((prev) => ({ ...prev, ...formData }));
    router.push("/onboarding/educations-and-works");
  };

  return (
    <div className="mt-20">
      <motion.h4
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xl font-semibold"
      >
        ลงทะเบียน
      </motion.h4>
      <div className="mt-4 w-full">
        <motion.h6
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-lg"
        >
          ข้อมูลส่วนตัว
        </motion.h6>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-4"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="flex flex-col"
            >
              <FormField
                control={form.control}
                name="prefix"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">คำนำหน้า</FormLabel>
                    <Select value={value} disabled onValueChange={onChange}>
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
                      disabled
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
                      disabled
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
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">อีเมล</FormLabel>
                    <Input
                      disabled
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
                name="bod"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      วัน เดือน ปีเกิด
                    </FormLabel>
                    <DatePicker
                      className="h-12 bg-zinc-100"
                      fromYear={fromYear.toDate()}
                      toYear={toYear.toDate()}
                      {...{ value, onChange }}
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
                      {...field}
                      placeholder="เบอร์ติดต่อ"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting || !form.formState.isValid}
                isLoading={isSubmitting}
                variant="ghost"
                className="flex gap-2 items-center float-end hover:text-zinc-500 self-end"
              >
                <span>ถัดไป</span>
                <ChevronRight size="1rem" />
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}

export default UserInfoFormPage;
