"use client";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Announcement,
  announcementSchema,
} from "./schemas/announcement-schema";
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
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import CreateAnnouncementAlert from "./_components/CreateAnnouncementAlert";
import { useState } from "react";
import SuspensedAlert from "./_components/SuspensedAlert";

interface Props {
  isSuspensed: boolean;
}

function CreateAnnouncementClient({ isSuspensed }: Props) {
  const form = useForm<Announcement>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      name: "",
      position: [
        {
          name: "",
          description: "",
          salary: "0",
          type: "full-time",
          amount: "0",
          welfare: "",
          qualification: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "position",
  });

  const addPosition = () => {
    append({
      name: "",
      description: "",
      salary: "0",
      type: "full-time",
      amount: "0",
      welfare: "",
      qualification: "",
    });
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOnSubmit = (data: Announcement) => {
    setIsConfirmOpen(true);
    console.log(data);
  };

  return (
    <>
      {isSuspensed && <SuspensedAlert />}
      <h5 className="text-2xl font-medium">ประกาศงาน</h5>
      <CreateAnnouncementAlert
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">ชื่อประกาศ</FormLabel>
                <Input
                  className="h-12 bg-zinc-100"
                  {...field}
                  placeholder="ชื่อประกาศ"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <h5 className="text-xl font-medium">ตำแหน่งงาน และรายละเอียด</h5>
            <Button type="button" onClick={addPosition} size="sm">
              <Plus size="1rem" />
              เพิ่มตำแหน่งงาน
            </Button>
          </div>
          {fields.map((field, i) => (
            <div key={field.id}>
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-sm font-medium">ตำแหน่งที่ {i + 1}</h6>
                <button
                  className="text-red-500 text-sm"
                  type="button"
                  onClick={() => remove(i)}
                >
                  ลบ
                </button>
              </div>
              <FormField
                control={form.control}
                name={`position.${i}.name`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">ตำแหน่งงาน</FormLabel>
                    <Input
                      className="h-12 bg-zinc-100"
                      {...field}
                      placeholder="ตำแหน่งงาน"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`position.${i}.type`}
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="mb-4 flex-1">
                      <FormLabel className="font-normal">ประเภทงาน</FormLabel>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="flex-1 h-12">
                          <SelectValue placeholder="เลือกประเภทงาน" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`position.${i}.amount`}
                  render={({ field }) => (
                    <FormItem className="mb-4 flex-1">
                      <FormLabel className="font-normal">
                        จำนวนรับสมัคร
                      </FormLabel>
                      <Input
                        className="h-12 bg-zinc-100"
                        {...field}
                        placeholder="จำนวนรับสมัคร"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`position.${i}.salary`}
                render={({ field: { value, onChange } }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">รายได้</FormLabel>
                    <Select value={value.toString()} onValueChange={onChange}>
                      <SelectTrigger className="w-1/2 h-12">
                        <SelectValue placeholder="เลือกรายได้" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">
                          ต่ำกว่า 10,000 ต่อเดือน
                        </SelectItem>
                        <SelectItem value="2">
                          20,000-30,000 บาทต่อเดือน
                        </SelectItem>
                        <SelectItem value="3">
                          30,001-40,000 บาทต่อเดือน
                        </SelectItem>
                        <SelectItem value="4">
                          40,001-50,000 บาทต่อเดือน
                        </SelectItem>
                        <SelectItem value="5">
                          มากกว่า 50,000 บาทต่อเดือน
                        </SelectItem>
                        <SelectItem value="6">สามารถเจรจาต่อรองได้</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`position.${i}.description`}
                render={({ field }) => (
                  <FormItem className="mb-4 flex-1">
                    <FormLabel className="font-normal">รายละเอียดงาน</FormLabel>
                    <Textarea
                      className="h-12 bg-zinc-100"
                      {...field}
                      value={(field.value as string) || ""}
                      placeholder="รายละเอียดงาน"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`position.${i}.qualification`}
                render={({ field }) => (
                  <FormItem className="mb-4 flex-1">
                    <FormLabel className="font-normal">
                      คุณสมบัติผู้รับสมัคร
                    </FormLabel>
                    <Textarea
                      className="h-12 bg-zinc-100"
                      {...field}
                      value={(field.value as string) || ""}
                      placeholder="คุณสมบัติผู้รับสมัคร"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`position.${i}.welfare`}
                render={({ field }) => (
                  <FormItem className="mb-4 flex-1">
                    <FormLabel className="font-normal">สวัสดิการ</FormLabel>
                    <Textarea
                      className="h-12 bg-zinc-100"
                      {...field}
                      value={(field.value as string) || ""}
                      placeholder="สวัสดิการ"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="border-b-2 border-primary my-2"></div>
            </div>
          ))}
          <Button className="w-36 mt-8 self-end">ประกาศ</Button>
        </form>
      </Form>
    </>
  );
}

export default CreateAnnouncementClient;