"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog";

function JobAlert() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="bg-black/10 backdrop-blur-sm">
        <DialogContent className="w-[90%] rounded-lg" showOverlay={false}>
          <DialogHeader>
            <DialogTitle>คุณผ่านการรับเข้าทำงาน</DialogTitle>
          </DialogHeader>
          <div className="text-lg items-start flex flex-col">
            <h6>ยินดีด้วย คุณผ่านเข้าทำงาน !</h6>
            <h6>
              บริษัท{" "}
              <span className="font-medium text-zinc-900">Apple Company</span>
            </h6>
            <h6>
              ตำแหน่ง{" "}
              <span className="font-medium text-zinc-900">
                Software Developer
              </span>
            </h6>
          </div>
          <DialogFooter>
            <div className="flex w-full gap-2">
              <Button className="flex-1" variant="outline">
                ปฏิเสธ
              </Button>
              <Button className="flex-1">ยอมรับ</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default JobAlert;
