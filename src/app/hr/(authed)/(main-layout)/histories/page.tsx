"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { getAllEmployeesFn } from "./queryFns/getAllEmployeesFn";
import { Employee } from "~/types/employee";
import { getJobAnnouncerFn } from "~/globalQueryFns/getJobAnnouncerFn";

const EmployeeCard = ({
  firstName,
  lastName,
  positionName,
  profileImage,
}: Employee) => {
  const name = firstName + " " + lastName;
  return (
    <div className="rounded-lg p-2 border-2 border-primary">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image
              src={profileImage}
              alt="test"
              fill
              className="object-cover"
            />
          </div>
          <div className="">
            <h6 className="text-lg">{positionName}</h6>
            <h5 className="text-sm font-medium">{name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

function HistoryPage() {
  const { data: jobA } = useQuery({
    queryKey: ["job-announcer"],
    queryFn: getJobAnnouncerFn,
  });

  const { data } = useQuery({
    queryKey: ["employee-history"],
    queryFn: () => getAllEmployeesFn(jobA?.companyId ?? ""),
    enabled: !!jobA,
  });

  console.log(jobA);

  const total = data?.length ?? 0;
  return (
    <div>
      <h3 className="text-xl">ประวัติการรับสมัครงาน</h3>
      <h4 className="text-lg">{total} คน</h4>
      <div className="mt-4 space-y-4">
        {data?.map((employee) => (
          <EmployeeCard key={employee.username} {...employee} />
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
