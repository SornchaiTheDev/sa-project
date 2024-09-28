import { CirclePlus, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function MyAnnouncementLayout({
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
        <div className="mt-6 space-y-3 h-full overflow-hidden">
          {Array.from({ length: 10 }, (_, i) => (
            <Link key={i} className="text-lg block truncate" href="#">
              Software Development, Web development
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-[300px] p-2 pt-0">{children}</div>
    </>
  );
}
