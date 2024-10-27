import { useAtom } from "jotai";
import { Clock, HandCoins, Users } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import type { Position } from "~/types/DTO/jobAnnouncement";
import { positionAtom } from "../store/positionStore";
import { cn } from "~/lib";

function PositionComponent({
  jobMode,
  name,
  order,
  amount,
  earnings,
  description,
  qualification,
  welfare,
  id,
}: Position & { order: number }) {
  const isFullTime = jobMode === 0;
  const jobType = isFullTime ? "งานประจำ" : "งานเสริม";

  const [selectedPositions, setSelectedPositions] = useAtom(positionAtom);

  const isSelected = selectedPositions.find((position) => position.id === id);
  const handleOnSelect = () => {
    if (isSelected) {
      setSelectedPositions((prev) => prev.filter((p) => p.id !== id));
    } else {
      setSelectedPositions((prev) => [...prev, { id, name }]);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-2 items-center">
        <h5 className="text-lg font-medium">
          ตำแหน่งที่ {order} : {name}
        </h5>
        <Button
          size="sm"
          className={cn(
            isSelected && "bg-[#F6F6F6] text-black border border-primary hover:bg-primary/50",
          )}
          onClick={handleOnSelect}
        >
          {isSelected ? "ยกเลิก" : "เลือก"}
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Clock size="1rem" />
        <h6 className="text-sm">{jobType}</h6>
      </div>

      <div className="flex items-center gap-2">
        <Users size="1rem" />
        <h6 className="text-sm">อัตรารับ {amount} อัตรา</h6>
      </div>
      <div className="flex gap-2 items-center">
        <HandCoins size="1rem" />
        <h6 className="text-sm">{earnings}</h6>
      </div>
      <h5 className="text-lg font-medium">รายละเอียดงาน</h5>
      <p className="font-light">{description}</p>
      <h5 className="text-lg font-medium">คุณสมบัติ</h5>
      <p className="font-light">{qualification}</p>
      <h5 className="text-lg font-medium">สวัสดิการ</h5>
      <p className="font-light">{welfare}</p>
    </>
  );
}

export default PositionComponent;
