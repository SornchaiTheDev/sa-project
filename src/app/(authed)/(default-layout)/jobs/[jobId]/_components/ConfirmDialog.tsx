import { useAtom, useAtomValue } from "jotai";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog";
import { confirmEnrollAtom, positionAtom } from "../store/positionStore";

export const ConfirmDialog = () => {
  const [isOpen, setIsOpen] = useAtom(confirmEnrollAtom);

  const selectedPositions = useAtomValue(positionAtom);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="bg-black/10 backdrop-blur-sm">
        <DialogContent className="w-[90%] rounded-lg" showOverlay={false}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              ยืนยันการสมัครงาน
            </DialogTitle>
          </DialogHeader>
          <div className="text-lg items-center flex flex-col">
            <h6>คุณยืนยันสมัครงานในตำแหน่ง</h6>
            <h6>
              ตำแหน่ง{" "}
              <span className="font-medium text-zinc-900">
                {selectedPositions.map((position) => position.name).join(",")}
              </span>
            </h6>
          </div>
          <DialogFooter>
            <div className="flex w-full gap-2">
              <Button className="flex-1" variant="outline">
                ยกเลิก
              </Button>
              <Button className="flex-1">ตกลง</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
