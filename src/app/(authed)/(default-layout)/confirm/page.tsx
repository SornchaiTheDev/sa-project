"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { getRecentJobsFn } from "./queryFns/getRecentJobsFn";
import { Job } from "~/types/job";
import { confirmJobFn } from "./mutateFns/confirmJobFn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ConfirmJob = Job & { status: ConfirmJobStatus };

type ConfirmJobStatus = "accept" | "reject" | "none";

function ConfirmJobPage() {
  const [jobs, setJobs] = useState<ConfirmJob[]>([]);

  const { data } = useQuery({
    queryKey: ["confirm-job"],
    queryFn: getRecentJobsFn,
  });

  useEffect(() => {
    if (!data) return;
    setJobs(data.map((j) => ({ ...j, status: "none" })));
  }, [data]);

  const handleOnSelect = (id: string, value: ConfirmJobStatus) => {
    const others = jobs.filter((job) => job.id !== id);
    const index = jobs.findIndex((job) => job.id === id);
    others.splice(index, 0, { ...jobs[index], status: value });
    setJobs(others);
  };

  const getCurrentStatus = (id: string) => {
    const job = jobs.find((job) => job.id === id);
    return job?.status;
  };

  const confirmJobPayload = jobs.map(({ id, status }) => ({
    id,
    status: status === "accept" ? 1 : 0,
  }));

  const router = useRouter();

  const confirmJob = useMutation({
    mutationKey: ["confirm-job"],
    mutationFn: () => confirmJobFn(confirmJobPayload),
    onSuccess: () => {
      toast.success("บันทึกสำเร็จ");
      router.push("/");
    },
    onError: () => {
      toast.error("เกิดข้อผิดพลาด");
    },
  });

  const handleSubmit = async () => {
    confirmJob.mutateAsync();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="border-2 border-primary rounded-lg mt-32 p-4 mx-4 w-[500px]">
        <h4 className="text-xl text-center font-medium">ยินดีด้วย</h4>
        <h5 className="text-lg font-medium">
          ยินดีด้วย คุณผ่านเข้าทำงาน ยืนยันสิทธิ์หรือไม่
        </h5>
        {jobs.map(({ id, companyName, jobName }) => (
          <div key={id}>
            <div className="flex gap-2">
              <h6>บริษัท</h6>
              <h5 className="font-medium">{companyName}</h5>
            </div>
            <div className="flex gap-2">
              <h6>ตำแหน่ง</h6>
              <h5 className="font-medium">{jobName}</h5>
            </div>
            <RadioGroup
              className="flex gap-20 mt-4"
              defaultValue="none"
              value={getCurrentStatus(id)}
              onValueChange={(v) => handleOnSelect(id, v as ConfirmJobStatus)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accept" id="already-has" />
                <Label htmlFor="accept">ยอมรับ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reject" id="not-yet" />
                <Label htmlFor="reject">ปฏิเสธ</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} className="w-28">
            บันทึก
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmJobPage;
