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
import { useEffect, useState } from "react";
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
import { onboardingAtom, resetOnboardingAtom } from "../store/onboarding-store";
import { useAtom, useSetAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { saveOnboardingInfo } from "./mutationFns/saveOnboardingInfo";

function EducationAndWorksForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { faculty, idCode } = useSession();
  const [onboard, setOnboard] = useAtom(onboardingAtom);
  const resetOnboarding = useSetAtom(resetOnboardingAtom);

  const form = useForm<EducationAndWorks>({
    resolver: zodResolver(educationAndWorks),
    defaultValues: {
      faculty: "คณะ" + faculty,
      major: onboard.major,
      gpax: onboard.gpax,
      workExp: onboard.workExp,
      activitiesHours: onboard.activitiesHours,
    },
  });

  console.log(form.watch("faculty"));

  const router = useRouter();

  const saveData = useMutation({
    mutationFn: saveOnboardingInfo,
    mutationKey: ["saveOnboardingInfo"],
    onSuccess: () => {
      resetOnboarding();
      router.push("/");
    },
    onError: (error) => {
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      setIsSubmitting(false);
    },
  });

  const handleOnSubmit = (formData: EducationAndWorks) => {
    setIsSubmitting(true);

    toast.promise(
      async () =>
        await saveData.mutateAsync({
          ...onboard,
          ...formData,
          username: idCode,
        }),
      {
        loading: "กำลังบันทึกข้อมูล...",
        success: "บันทึกข้อมูลสำเร็จ",
      },
    );
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

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
          ประวัติการศึกษาและประวัติการทำงาน
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
                    <Select disabled value={value} onValueChange={onChange}>
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
                        {isLoading ? (
                          "Loading"
                        ) : (
                          <SelectValue placeholder="ภาควิชา" />
                        )}
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
