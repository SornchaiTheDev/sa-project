import React from "react";
import CandidateCard from "./_components/CandidateCard";
import FilterSection from "./_components/FilterSection";
import axios from "axios";
import { JobAnnouncement } from "~/types/jobAnnouncement";
import { BriefcaseBusiness, Users } from "lucide-react";
import { env } from "~/configs/env";

async function AnnouncementDetailPage({
  params,
}: {
  params: { announcementId: string };
}) {
  const { announcementId } = params;
  const { data } = await axios.get<{ announcement: JobAnnouncement }>(
    `${env.WEB_URL}/api/announcements/${announcementId}`,
  );

  const title = data.announcement.title;
  const positions = data.announcement.positions;
  const description = data.announcement.description;
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-xl">{title}</h4>
        <button className="text-xs">แก้ไข</button>
      </div>
      <div className="mt-4">
        <div className="space-y-2">
          <div>
            <h6 className="text-sm font-medium">รายละเอียดงาน</h6>
            <p>{description}</p>
          </div>
          <div className="space-y-2 mt-1 w-1/3">
            <h6 className="text-sm font-medium">ตำแหน่งงาน/อัตรารับสมัคร</h6>
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
        <FilterSection />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <CandidateCard
              key={index}
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/220px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
              name="นางสาววิมุดากร กิจเตชะพานิช"
              faculty="วิทยาศาสตร์"
              major="วิทยาการคอมพิวเตอร์"
              gpax={3.81}
              status="interview-accepted"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default AnnouncementDetailPage;
