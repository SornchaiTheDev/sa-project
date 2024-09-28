import { ChevronsDown, Clock, HandCoins, UsersRound } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import CandidateCard from "./_components/CandidateCard";

function AnnouncementDetailPage() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-xl">Software Development, Web development</h4>
        <button className="text-xs">แก้ไข</button>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <Switch />
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <p className="text-xs text-primary">เปิดรับสมัคร</p>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <Clock size="0.9rem" />
          <p className="text-sm">full time job</p>
        </div>
        <div className="flex items-center gap-2">
          <UsersRound size="0.9rem" />
          <p className="text-sm">1</p>
        </div>
        <div className="flex items-center gap-2">
          <HandCoins size="0.9rem" />
          <p className="text-sm">120,000 - 30,000 baht per month</p>
        </div>
        <h6 className="text-sm">Job Description</h6>
        <ul className="list-disc list-inside pl-2">
          <li>มีความรู้ด้าน Database และการเขียน Web Application</li>
          <li>มีความรู้ด้าน PHP,ReactJS , NodeJS,CSS,TailwindCSS</li>
          <li>ติดต่อประสานงานระหว่าง User และ Programmer ภายในที</li>
        </ul>
        <button className="text-primary text-sm flex items-center gap-1 mt-2">
          <ChevronsDown size="0.9rem" />
          อ่านข้อมูลเพิ่มเติม
        </button>
        <div className="mt-4 flex gap-4 items-center">
          <h5>10 ผู้สมัคร</h5>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="ตำแหน่ง" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" className="text-primary">
            ผู้สมัครทั้งหมด
          </Button>
          <Button variant="ghost">ดำเนินการสัมภาษณ์</Button>
          <Button variant="ghost">ดำเนินการรับเข้าทำงาน</Button>
        </div>
        <div className="mt-6 space-y-4">
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
        </div>
      </div>
    </>
  );
}

export default AnnouncementDetailPage;
