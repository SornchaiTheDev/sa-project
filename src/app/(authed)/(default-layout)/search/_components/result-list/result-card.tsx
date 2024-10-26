import Image from "next/image";
import { Button } from "~/components/ui/button";
import { BriefcaseBusiness, Heart, Users } from "lucide-react";
import { JobAnnouncement } from "~/types/DTO/jobAnnouncement";
import dayjs from "~/lib/dayjs";
import Link from "next/link";

export default function ResultCard({
  title,
  id,
  description,
  companyImage,
  createdAt,
  positions,
  companyName,
}: JobAnnouncement) {
  const jobCreatedAt = dayjs(createdAt).fromNow();

  return (
    <Link
      href={`/jobs/${id}`}
      className="rounded-lg overflow-hidden mt-4 border block bg-zinc-50 border-primary"
    >
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <div className="relative rounded-xl w-16 h-16">
            <Image
              src={companyImage}
              fill
              className="object-contain"
              alt="job logo"
            />
          </div>
          <Button size="icon" variant="ghost">
            <Heart />
          </Button>
        </div>
        <h5 className="text-xl font-medium">{title}</h5>
        <h6 className="text-lg">{companyName}</h6>
        <h6 className="text-sm">ตำแหน่งงาน/อัตรารับสมัคร</h6>
        {positions.map(({ name, amount }) => (
          <div key={name} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness size="1rem" />
              <h6>{name}</h6>
            </div>
            <div className="flex items-center gap-2">
              <Users size="1rem" />
              <h6>{amount} อัตรา</h6>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <h6 className="text-sm">รายละเอียดงาน (Software Developer) </h6>
          <Button variant="link" className="px-0">
            เปลี่ยน
          </Button>
        </div>
        <p>{description}</p>
        {/* <ul className="list-disc list-inside"> */}
        {/*   <li>มีความรู้ด้าน Database และการเขียน Web Application</li> */}
        {/*   <li>มีความรู้ด้าน PHP,ReactJS , NodeJS,CSS,TailwindCSS</li> */}
        {/*   <li>ติดต่อประสานงานระหว่าง User และ Programmer</li> */}
        {/* </ul> */}
      </div>
      <div className="w-full bg-primary p-2 mt-2">
        <h6 className="text-white text-sm">{jobCreatedAt}</h6>
      </div>
    </Link>
  );
}
