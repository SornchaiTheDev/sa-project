import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function WaitForVerifyAlert({ open, onOpenChange }: Props) {
  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogOverlay className="bg-black/10 backdrop-blur-sm">
        <DialogContent
          className="w-[40%] rounded-lg border-2 border-red-600"
          showOverlay={false}
          showClose={false}
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              กำลังดำเนินการตรวจสอบ
            </DialogTitle>
          </DialogHeader>
          <p className="text-center">
            บัญชีของคุณยังไม่ผ่านการอนุมัติ <br />
            กรุณาติดต่อ กองพัฒนานิสิตเพื่อเข้าใช้งานระบบ
          </p>
          <DialogFooter className="sm:justify-center">
            <DialogClose>
              <Button className="w-32 bg-red-600 hover:bg-red-700">ปิด</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default WaitForVerifyAlert;
