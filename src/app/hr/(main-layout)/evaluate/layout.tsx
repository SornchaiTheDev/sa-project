import { CirclePlus, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import AnnouncementLink from "../my-announcements/_components/AnnouncementLink";

export default function EvaluateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-20 h-full w-[300px]  rounded-lg bg-zinc-100 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h5 className="text-lg">ประกาศงาน</h5>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <CirclePlus size="1rem" />
            </Button>
          </div>
          <button className="text-sm font-light">แก้ไข</button>
        </div>
        <div className="flex rounded-lg overflow-hidden border border-primary mt-2">
          <Input className="rounded-none border-none" />
          <Button className="rounded-none w-10" size="icon">
            <SearchIcon />
          </Button>
        </div>
        <div className="mt-6 h-full overflow-hidden">
          {Array.from({ length: 10 }, (_, i) => (
            <AnnouncementLink
              key={i}
              href={`my-announcements/${i.toString()}`}
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-zinc-100 p-4 mt-0 ml-[308px]">
        {children}
      </div>
    </>
  );
}
