"use client";

import Image from "next/image";
import EvaluateList from "./_components/EvaluateList";
import { useAtomValue } from "jotai";
import { cn } from "~/lib";
import { employeeAtom } from "./store/employeeStore";

function EvaluatePage() {
  const { firstName, lastName, username, positionName, profileImage } =
    useAtomValue(employeeAtom);
  const isNoEmployee = username === "";

  return (
    <>
      <div
        className={cn(
          "flex flex-col mb-10 relative",
          isNoEmployee && "h-screen",
        )}
      >
        {isNoEmployee ? (
          <h4 className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            เลือกนิสิตเพื่อประเมิน
          </h4>
        ) : (
          <>
            <div className="flex justify-between">
              <div className="">
                <h5 className="text-2xl font-medium">ประเมินการทำงาน</h5>
                <h6 className="text-sm mt-4">ชื่อ</h6>
                <h4 className="text-2xl font-medium">
                  {firstName + " " + lastName}
                </h4>
                <h6 className="text-sm">ตำแหน่ง</h6>
                <h4 className="text-2xl font-medium">{positionName}</h4>
              </div>
              <div className="w-32 aspect-[3/4] rounded-lg overflow-hidden relative">
                <Image
                  src={profileImage}
                  alt={firstName + " " + lastName + " picture"}
                  fill
                  className="object-center object-cover"
                />
              </div>
            </div>
            <EvaluateList />
          </>
        )}
      </div>
    </>
  );
}

export default EvaluatePage;
