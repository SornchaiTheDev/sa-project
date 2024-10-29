import Image from "next/image";
import { BriefcaseBusiness, Users } from "lucide-react";
import dayjs from "~/lib/dayjs";
import Link from "next/link";
import { JobAnnouncement } from "~/types/jobAnnouncement";

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
        <div className="relative rounded-xl w-16 h-16">
          <Image
            src={companyImage}
            fill
            className="object-contain"
            alt="job logo"
          />
        </div>
        <h5 className="text-xl font-medium">{title}</h5>
        <h6 className="text-lg">{companyName}</h6>
        <div>
          <h6 className="text-sm font-medium">ตำแหน่งงาน/อัตรารับสมัคร</h6>
          <div className="space-y-2 mt-1">
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
          </div>
        </div>

        <div>
          <h6 className="text-sm font-medium">รายละเอียดงาน</h6>
          <p>{description}</p>
        </div>
      </div>
      <div className="w-full bg-primary p-2 mt-2">
        <h6 className="text-white text-sm">{jobCreatedAt}</h6>
      </div>
    </Link>
  );
}
