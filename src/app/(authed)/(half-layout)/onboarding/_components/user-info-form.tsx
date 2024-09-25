import { useForm } from "react-hook-form";
import { userInfo, UserInfo } from "../schemas/user-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DatePicker } from "~/components/ui/date-picker";
import dayjs from "~/lib/dayjs";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UserInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<UserInfo>({
    resolver: zodResolver(userInfo),
    defaultValues: {
      prefix: "นาย",
      firstName: "ศรชัย",
      lastName: "สมสกุล",
      email: "sornchai.som@ku.th",
      bod: new Date("2003-10-14"),
      phone: "0966353408",
    },
  });

  const fromYear = dayjs().add(-25, "year");
  const toYear = fromYear.add(10, "year");

  const router = useRouter();

  const handleOnSubmit = (formData: UserInfo) => {
    setIsSubmitting(true);
    toast.promise(
      new Promise((res) =>
        setTimeout(() => {
          res("ok");
          setIsSubmitting(false);
          router.push("/");
        }, 1000),
      ),
      {
        loading: "กำลังบันทึกข้อมูล...",
        success: "บันทึกข้อมูลสำเร็จ",
      },
    );
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col"
        >
          <FormField
            control={form.control}
            name="prefix"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">คำนำหน้า</FormLabel>
                <Input className="h-12" {...field} placeholder="คำนำหน้า" />
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
                <Input className="h-12" {...field} placeholder="ชื่อ" />
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
                <Input className="h-12" {...field} placeholder="นามสกุล" />
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
                <Input className="h-12" {...field} placeholder="อีเมล" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bod"
            render={({ field: { value, onChange } }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">วัน เดือน ปีเกิด</FormLabel>
                <DatePicker
                  className="h-12"
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
                <Input className="h-12" {...field} placeholder="เบอร์ติดต่อ" />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="h-10" isLoading={isSubmitting}>
            บันทึกข้อมูล
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UserInfoForm;