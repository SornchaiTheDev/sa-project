import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { rejectFn } from "../mutateFns/rejectFn";
import { acceptFn } from "../mutateFns/acceptFn";
import { toast } from "sonner";

interface Props {
  id: string;
  image: string;
  name: string;
  faculty: string;
  major: string;
  gpax: number;
  description: string;
  status: "qualify-phrase" | "job-waiting" | "job-accepted" | "job-rejected";
  announcementId: string;
}

function CandidateCard({
  id,
  image,
  name,
  faculty,
  major,
  gpax,
  status,
  description,
  announcementId,
}: Props) {
  const queryClient = useQueryClient();
  const acceptCandidate = useMutation({
    mutationFn: () => acceptFn(announcementId, id),
    onSuccess: () => {
      toast.success("ผ่านการคัดเลือก", { description: name });
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
    onError: () => {
      toast.error("เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง");
    },
  });

  const rejectCandidate = useMutation({
    mutationFn: () => rejectFn(announcementId, id),
    onSuccess: () => {
      toast.warning("ไม่ผ่านการคัดเลือก", { description: name });
    },
    onError: () => {
      toast.error("เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง");
    },
  });

  const renderBottomSection = () => {
    switch (status) {
      case "qualify-phrase":
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              className="w-24"
              onClick={() => rejectCandidate.mutate()}
            >
              ปฏิเสธ
            </Button>
            <Button
              className="w-24"
              size="sm"
              onClick={() => acceptCandidate.mutate()}
            >
              ยอมรับ
            </Button>
          </>
        );
      case "job-waiting":
        return (
          <h6 className="text-sm text-secondary">
            กำลังรอผลยืนยันสิทธิ์เข้าทำงาน...
          </h6>
        );
      case "job-accepted":
        return <h5 className="text-sm text-primary">ยืนยันการเข้าทำงาน</h5>;
      case "job-rejected":
        return <h5 className="text-sm text-red-500">ปฏิเสธการเข้าทำงาน</h5>;
      default:
        return null;
    }
  };
  return (
    <div className="rounded-lg p-2 border-2 border-primary">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image src={image} alt="test" fill className="object-cover" />
          </div>
          <div className="">
            <h5 className="text-lg font-medium">{name}</h5>
            <h6 className="text-sm">
              คณะ {faculty} สาขา {major}
            </h6>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-8 py-1 bg-primary rounded-md text-white flex flex-col items-center">
            <h5>GPA</h5>
            <h6>{gpax}</h6>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h6 className="text-sm font-medium">ประสบการณ์ทำงาน</h6>
        <p>{description}</p>
      </div>
      <div className="flex justify-end items-center gap-3 p-2">
        {renderBottomSection()}
      </div>
    </div>
  );
}

export default CandidateCard;
