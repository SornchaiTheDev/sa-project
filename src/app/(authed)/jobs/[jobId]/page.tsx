import {
  CircleEllipsis,
  Clock,
  HandCoins,
  Heart,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import { jobAnnouncements } from "~/__mocks__/job-announcements";
import { Button } from "~/components/ui/button";
import dayjs from "~/lib/dayjs";

function JobDetailPage() {
  const { companyImage, companyName, title, description, createdAt } =
    jobAnnouncements[8];
  const jobCreatedAt = dayjs(createdAt).fromNow();
  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 space-y-2 pb-20">
        <div className="flex gap-4 justify-between items-center">
          <div className="relative rounded-xl w-32 h-32">
            <Image
              src={companyImage}
              fill
              className="object-contain"
              alt="job logo"
            />
          </div>
          <h5>{companyName}</h5>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <CircleEllipsis />
          </Button>
        </div>
        <div className="flex justify-between">
          <h5 className="text-xl">{title}</h5>
          <Button size="icon" variant="ghost">
            <Heart />
          </Button>
        </div>
        <h6 className="text-sm">{companyName}</h6>
        <div className="flex gap-2 items-center">
          <MapPin size="1rem" />
          <h6 className="text-sm">กรุงเทพมหานคร</h6>
        </div>
        <div className="flex gap-2 items-center">
          <HandCoins size="1rem" />
          <h6 className="text-sm">สามารถเจรจาต่อรองได้</h6>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <h5 className="text-lg font-medium">
            ตำแหน่งที่ 1 : Software Developer
          </h5>
          <Button size="sm">เลือก</Button>
        </div>
        <div className="flex gap-2 items-center">
          <Clock size="1rem" />
          <h6 className="text-sm">งานประจำ</h6>
        </div>

        <div className="flex items-center gap-2">
          <Users size="1rem" />
          <h6 className="text-sm">อัตรารับ {1} อัตรา</h6>
        </div>
        <h6>โพสต์เมื่อ {jobCreatedAt}</h6>
        <h5 className="text-lg font-medium">รายละเอียดงาน</h5>
        <ul className="list-disc list-inside font-light">
          <li>
            พัฒนา Web Application และ Support การใช้งานตามที่ได้รับมอบหมาย
          </li>
          <li>
            พัฒนาระบบออกแบบ CSS หรือ TailwindCSS และ Support การใช้งานของ User
            ตามที่ได้รับมอบหมาย
          </li>
          <li>ติดต่อประสานงานระหว่าง User และ Programmer ภายในทีม</li>
        </ul>
        <h5 className="text-lg font-medium">คุณสมบัติ</h5>
        <ol className="list-decimal list-inside font-light">
          <li>เพศชาย/หญิง อายุ 30-35 ปี</li>
          <li>วุฒิปริญญาตรี สาขาวิทยาการคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง</li>
          <li> มีความรู้ด้าน Database  และการเขียน Web Application</li>
          <li>มีความรู้ด้าน PHP,ReaxtJS, NodeJS, CSS, TailwindCSS</li>
          <li>หากมีความสามารถด้าน C#.net จะได้รับการพิจารณาเป็นพิเศษ</li>
          <li>มีทักษะในการสื่อสารสามารถทำงานเป็นทีมได้ มีความกระตือรือร้น</li>
          <li>มุ่งมั่นในการทำงาน และรับผิดชอบสูง</li>
          <li>หากสามารถเริ่มงานได้ทันทีจะพิจารณาเป็นพิเศษ</li>
        </ol>
        <h5 className="text-lg font-medium">สวัสดิการ</h5>
        <p className="font-light">ตามโครงสร้างบริษัท</p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-2 bg-white mx-auto max-w-5xl">
        <div className="border border-primary rounded-lg">
          <h6 className="p-2">
            ตำแหน่งที่สมัคร: Software Developer, UX/UI designer
          </h6>
          <Button className="w-full h-12">สมัครงาน</Button>
        </div>
      </div>
    </>
  );
}

export default JobDetailPage;
