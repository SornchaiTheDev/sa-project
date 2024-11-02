import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  educationAndWorks,
  EducationAndWorks,
} from "~/app/(authed)/(half-layout)/onboarding/educations-and-works/schemas/education-and-works";
import { Button } from "~/components/ui/button";
import { useAllLoginSession } from "~/wrapper/AllLoginSessionWrapper";
import { getWorkInfoFn } from "../queryFn/getWorkInfoFn";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { faculties } from "~/constants/faculty";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { updateWorkInfoFn } from "../mutateFns/updateWorkInfoFn";
import { toast } from "sonner";

function EditEducationAndWork() {
  const { uid } = useAllLoginSession();
  const { data, refetch } = useQuery({
    queryKey: ["education-and-work", uid],
    queryFn: getWorkInfoFn,
  });

  const form = useForm<EducationAndWorks>({
    resolver: zodResolver(educationAndWorks),
    defaultValues: {
      faculty: data?.faculty ?? "",
      major: data?.major ?? "",
      gpax: data?.gpax ?? "",
      description: data?.description ?? "",
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      faculty: data.faculty,
      major: data.major,
      gpax: data.gpax,
      description: data.description,
    });
  }, [form, data]);

  const [isEdit, setIsEdit] = useState(false);

  const updateWorkInfo = useMutation({
    mutationFn: updateWorkInfoFn,
    mutationKey: ["updateWorkInfo", uid],
    onSuccess: async () => {
      await refetch();
      toast.success("บันทึกข้อมูลสำเร็จ");
      setIsEdit(false);
    },
    onError: () => {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    },
  });

  const handleOnSubmit = (data: EducationAndWorks) => {
    updateWorkInfo.mutate(data);
    form.reset();
  };

  const majors =
    faculties.find(({ name }) => name === form.watch("faculty"))?.majors ?? [];

  return (
    <div>
      <div className="flex justify-between items-center mt-10">
        <h5 className="text-xl font-medium">ข้อมูลประวัติการศึกษา และทำงาน</h5>
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="underline text-primary"
        >
          {isEdit ? "ยกเลิก" : "แก้ไข"}
        </button>
      </div>
      <div className="space-y-4 mt-4">
        {isEdit ? (
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
                        <SelectItem value="none">คณะ</SelectItem>
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
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-4 flex-1">
                    <FormLabel className="font-normal">
                      ประวัติการทำงาน
                    </FormLabel>
                    <Textarea
                      className="bg-zinc-100"
                      rows={6}
                      {...field}
                      value={(field.value as string) || ""}
                      placeholder="ประวัติการทำงาน"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={!form.formState.isValid}
                isLoading={false}
                className="w-full"
              >
                บันทึก
              </Button>
            </form>
          </Form>
        ) : (
          <>
            <div className="">
              <h6>คณะ</h6>
              <h6 className="font-medium">{data?.faculty}</h6>
            </div>
            <div className="">
              <h6>สาขา</h6>
              <h6 className="font-medium">{data?.major}</h6>
            </div>
            <div className="">
              <h6>เกรดเฉลี่ย</h6>
              <h6 className="font-medium">{data?.gpax}</h6>
            </div>
            <div className="">
              <h6>ประวัติการทำงาน</h6>
              <h6 className="font-medium">{data?.description}</h6>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditEducationAndWork;
