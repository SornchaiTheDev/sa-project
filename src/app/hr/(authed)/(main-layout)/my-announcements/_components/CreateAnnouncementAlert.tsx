import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
function CreateAnnouncementAlert({ isOpen, onOpenChange }: Props) {
  return (
    <Dialog {...{ isOpen, onOpenChange }}>
      <DialogOverlay className="bg-black/10 backdrop-blur-sm">
        <DialogContent className="w-[90%] rounded-lg" showOverlay={false}>
          <DialogHeader>
            <DialogTitle>ยืนยันการสร้างประกาศ</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full gap-2">
              <Button className="flex-1" variant="outline">
                ยกเลิก
              </Button>
              <Button className="flex-1">ยืนยัน</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default CreateAnnouncementAlert;
