import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAllLoginSession } from "~/wrapper/AllLoginSessionWrapper";
import { getStudent } from "../queryFn/getStudent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dayjs } from "~/lib";
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
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import DatePicker from "~/components/ui/date-picker";
import UploadFile from "~/components/upload-file";
import { UserInfo, userInfo } from "../schemas/user-info";
import { updateUserInfoFn } from "../mutateFns/updateUserInfoFn";
import { toast } from "sonner";

function EditUserInfo() {
  const { uid } = useAllLoginSession();
  const { data, refetch } = useQuery({
    queryKey: ["student", uid],
    queryFn: () => getStudent(uid),
  });

  const form = useForm<UserInfo>({
    resolver: zodResolver(userInfo),
    defaultValues: {
      title: data?.prefix ?? "",
      firstName: data?.firstName ?? "",
      lastName: data?.firstName ?? "",
      dateOfBirth: new Date(data?.dob ?? Date.now()),
      email: data?.email ?? "",
      phoneNumber: data?.phoneNumber ?? "",
      profileImage: [],
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      title: data.prefix,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: new Date(data.dob),
      email: data.email,
      phoneNumber: data.phoneNumber,
      profileImage: [],
    });
  }, [data, form]);

  const fromYear = dayjs().add(-25, "year");
  const toYear = fromYear.add(10, "year");

  const [isInfoEdit, setIsInfoEdit] = useState(false);

  const handleOnEditUserInfo = () => {
    setIsInfoEdit(!isInfoEdit);
    form.reset();
  };

  const updateUserInfo = useMutation({
    mutationKey: ["update-user-info", uid],
    mutationFn: updateUserInfoFn,
    onSuccess: async () => {
      await refetch();
      toast.success("บันทึกข้อมูลสำเร็จ");
      setIsInfoEdit(false);
    },
    onError: () => {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    },
  });

  const handleOnSubmit = (data: UserInfo) => {
    updateUserInfo.mutate(data);
  };

  if (data === undefined) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full overflow-hidden w-32 h-32 relative">
        <Image
          src={data.profileImage}
          alt="profile image"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <h5 className="text-xl font-medium">ข้อมูลส่วนตัว</h5>
        <button
          onClick={handleOnEditUserInfo}
          className="underline text-primary"
        >
          {isInfoEdit ? "ยกเลิก" : "แก้ไข"}
        </button>
      </div>
      <div className="space-y-4 mt-4 w-full">
        {isInfoEdit ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="flex flex-col"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">คำนำหน้า</FormLabel>
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full h-12 bg-zinc-100">
                        <SelectValue placeholder="คำนำหน้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">โปรดเลือกคำนำหน้า</SelectItem>
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
                name="dateOfBirth"
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
                name="phoneNumber"
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
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      อัปโหลดรูปโปรไฟล์
                    </FormLabel>
                    <UploadFile
                      uploadApiEndpoint="/api/nisit/onboarding/upload/profile"
                      maxFiles={1}
                      accept={{
                        "image/*": [".png", ".jpg", ".jpeg"],
                        "application/pdf": [".pdf"],
                      }}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isInfoEdit && (
                <Button
                  disabled={updateUserInfo.isPending || !form.formState.isValid}
                  isLoading={updateUserInfo.isPending}
                  className="w-full"
                >
                  บันทึก
                </Button>
              )}
            </form>
          </Form>
        ) : (
          <>
            <div className="">
              <h6>คำนำหน้า</h6>
              <h6 className="font-medium">{data?.prefix}</h6>
            </div>
            <div className="">
              <h6>ชื่อ</h6>
              <h6 className="font-medium">{data?.firstName}</h6>
            </div>
            <div className="">
              <h6>นามสกุล</h6>
              <h6 className="font-medium">{data?.lastName}</h6>
            </div>
            <div className="">
              <h6>วัน เดือน ปีเกิด</h6>
              <h6 className="font-medium">
                {dayjs(data?.dob).format("DD MMMM BBBB")}
              </h6>
            </div>
            <div className="">
              <h6>อีเมล</h6>
              <h6 className="font-medium">{data?.email}</h6>
            </div>
            <div className="">
              <h6>เบอร์ติดต่อ</h6>
              <h6 className="font-medium">{data?.phoneNumber}</h6>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditUserInfo;
