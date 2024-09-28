import { CirclePlus, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import CreateAnnouncementForm from "./_components/CreateAnnouncementForm";

function MyAnnouncementsPage() {
  return (
    <div className="flex gap-4 p-4 flex-1">
      <div className="w-[300px] h-full rounded-lg bg-zinc-100 p-4">
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
        <div className="mt-6 space-y-3">
          {Array.from({ length: 10 }, (_, i) => (
            <Link key={i} className="text-lg block truncate" href="#">
              Software Development, Web development
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 h-full rounded-lg bg-zinc-100 p-4">
        <h5 className="text-2xl font-medium">ประกาศงาน</h5>
        <CreateAnnouncementForm />
      </div>
    </div>
  );
}

export default MyAnnouncementsPage;
