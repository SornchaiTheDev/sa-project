import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { Button } from "~/components/ui/button";
import { confirmEnrollAtom, positionAtom } from "../store/positionStore";

function EnrollSection() {
  const selectedPositions = useAtomValue(positionAtom);

  const isNoSelectedPosition = selectedPositions.length === 0;

  const positionNames = selectedPositions
    .map((position) => position.name)
    .join(", ");

  const setIsOpen = useSetAtom(confirmEnrollAtom);
  const handleEnroll = () => {
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 mx-auto max-w-5xl">
      <div className="border border-primary rounded-lg bg-white">
        {!isNoSelectedPosition && (
          <h6 className="p-2">ตำแหน่งที่สมัคร: {positionNames}</h6>
        )}
        <Button
          className="w-full h-12"
          onClick={handleEnroll}
          disabled={isNoSelectedPosition}
        >
          สมัครงาน
        </Button>
      </div>
    </div>
  );
}

export default EnrollSection;
