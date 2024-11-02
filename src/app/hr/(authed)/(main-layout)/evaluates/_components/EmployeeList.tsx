"use client";

import Image from "next/image";
import { cn } from "~/lib";
import { useQuery } from "@tanstack/react-query";
import { getUnEvaluatedEmployeesFn } from "../queryFns/getUnEvaluatedEmployeesFn";
import { getJobAnnouncerFn } from "~/globalQueryFns/getJobAnnouncerFn";
import { Skeleton } from "~/components/ui/skeleton";
import { useAtom } from "jotai";
import { Employee } from "~/types/employee";
import { employeeAtom } from "../store/employeeStore";
import { useState } from "react";

function EmployeeList() {
  const { data: jobA } = useQuery({
    queryKey: ["job-announcer"],
    queryFn: getJobAnnouncerFn,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["employee-list"],
    queryFn: () => getUnEvaluatedEmployeesFn(jobA?.companyId ?? ""),
  });

  const [_, setSelectedEmployee] = useAtom(employeeAtom);
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleChooseEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedPosition(employee.positionID);
  };
  return (
    <div className="overflow-y-auto mb-4">
      <div className="space-y-2 px-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-20" />
            ))
          : data?.map((employee) => (
              <button
                onClick={() => handleChooseEmployee(employee)}
                key={employee.username}
                className={cn(
                  "flex gap-4 items-center p-2 px-4 w-full",
                  employee.positionID === selectedPosition &&
                    "bg-primary rounded-md text-white",
                )}
              >
                <div className="w-16 aspect-square rounded-lg overflow-hidden relative">
                  <Image
                    src={employee.profileImage}
                    alt={
                      employee.firstName + " " + employee.lastName + " picture"
                    }
                    fill
                    className="object-center object-cover"
                  />
                </div>
                <div className="">
                  <h5 className="font-medium text-start">
                    {employee.firstName + " " + employee.lastName}
                  </h5>
                  <h6 className="text-sm text-start">{employee.positionName}</h6>
                </div>
              </button>
            ))}
      </div>
    </div>
  );
}

export default EmployeeList;
