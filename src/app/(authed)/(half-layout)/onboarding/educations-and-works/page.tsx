"use client";
import { useForm } from "react-hook-form";
import {
  educationAndWorks,
  type EducationAndWorks,
} from "./schemas/education-and-works";
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
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { motion } from "framer-motion";
import { useSession } from "~/wrapper/SessionWrapper";
import { Textarea } from "~/components/ui/textarea";
import { faculties } from "~/constants/faculty";

function EducationAndWorksForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { faculty } = useSession();
  const form = useForm<EducationAndWorks>({
    resolver: zodResolver(educationAndWorks),
    defaultValues: {
      faculty: "คณะ" + faculty,
      major: "",
      gpax: "",
      workExp: "",
      activitiesHours: "4",
    },
  });

  const router = useRouter();

  const handleOnSubmit = (formData: EducationAndWorks) => {
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

  const majors =
    faculties.find(({ name }) => name === form.watch("faculty"))?.majors ?? [];

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
                name="faculty"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">คณะ</FormLabel>
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full h-12 bg-zinc-100">
                        <SelectValue placeholder="คณะ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>
                          คณะ
                        </SelectItem>
                        {faculties.map(({ name }) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="major"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">ภาควิชา</FormLabel>
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full h-12 bg-zinc-100">
                        <SelectValue placeholder="ภาควิชา" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>
                          ภาควิชา
                        </SelectItem>
                        {majors.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gpax"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">เกรดเฉลี่ย</FormLabel>
                    <Input
                      className="h-12 bg-zinc-100"
                      {...field}
                      placeholder="เกรดเฉลี่ย"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activitiesHours"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      ชั่วโมงกิจกรรม
                    </FormLabel>
                    <Input
                      className="h-12 bg-zinc-100"
                      {...field}
                      placeholder="ชั่วโมงกิจกรรม"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workExp"
                render={({ field }) => (
                  <FormItem className="mb-4 flex-1">
                    <FormLabel className="font-normal">
                      ประวัติการทำงาน
                    </FormLabel>
                    <Textarea
                      className=" bg-zinc-100"
                      rows={6}
                      {...field}
                      value={(field.value as string) || ""}
                      placeholder="ประวัติการทำงาน"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="h-10" isLoading={isSubmitting}>
                บันทึกข้อมูล
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}

export default EducationAndWorksForm;
