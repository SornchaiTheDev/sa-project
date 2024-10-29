import { useAtom, useAtomValue } from "jotai";
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
import { confirmEnrollAtom, positionAtom } from "../store/positionStore";
import { useMutation } from "@tanstack/react-query";
import { enrollFn } from "../mutateFns/enrollFn";
import { useAllLoginSession } from "~/wrapper/AllLoginSessionWrapper";
import { toast } from "sonner";

interface Props {
  jobAnnounceId: string;
}

export const ConfirmDialog = (props: Props) => {
  const { uid } = useAllLoginSession();
  const [isOpen, setIsOpen] = useAtom(confirmEnrollAtom);

  const selectedPositions = useAtomValue(positionAtom);
  const enroll = useMutation({
    mutationFn: () =>
      enrollFn({
        jobAnnounceId: props.jobAnnounceId,
        positionIds: selectedPositions.map((position) => position.id),
        username: uid,
      }),
    onSuccess: (data) => {
      switch (data.code) {
        case "ENROLL_SUCCESS":
          toast.success("สมัครงานสำเร็จ");
          break;
        case "ENROLL_FAILED":
          toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
          break;
        case "ALREADY_ENROLLED":
          toast.error("คุณได้สมัครงานนี้แล้ว");
          break;
      }
    },
    onError: () => {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    },
  });

  const handleOnConfirm = () => {
    enroll.mutate();
  };

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
              <DialogClose className="flex-1">
                <Button variant="outline" className="w-full">
                  ยกเลิก
                </Button>
              </DialogClose>
              <Button onClick={handleOnConfirm} className="flex-1">
                ตกลง
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
