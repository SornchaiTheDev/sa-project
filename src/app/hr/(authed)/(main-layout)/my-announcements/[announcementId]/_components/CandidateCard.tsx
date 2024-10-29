import Image from "next/image";
import { Button } from "~/components/ui/button";

interface Props {
  image: string;
  name: string;
  faculty: string;
  major: string;
  gpax: number;
  description: string;
  status:
    | "interview-phrase"
    | "interview-waiting"
    | "interview-accepted"
    | "interview-rejected"
    | "job-waiting"
    | "job-accepted"
    | "job-rejected";
}

function CandidateCard({
  image,
  name,
  faculty,
  major,
  gpax,
  status,
  description,
}: Props) {
  const renderBottomSection = () => {
    switch (status) {
      case "interview-phrase":
        return (
          <>
            <Button variant="outline" size="sm" className="w-24">
              ปฏิเสธ
            </Button>
            <Button className="w-24" size="sm">
              ยอมรับ
            </Button>
          </>
        );
      case "interview-waiting":
        return (
          <h5 className="text-sm text-secondary">
            กำลังรอผลยืนยันสิทธิ์เข้าทำงาน
          </h5>
        );
      case "interview-accepted":
        return (
          <>
            <Button variant="outline" size="sm" className="w-24">
              ลบ
            </Button>
            <Button className="w-24" size="sm">
              ผ่านการคัดเลือก
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
        return <h5 className="text-sm text-primary">ยอมรับการเข้าทำงาน</h5>;
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
