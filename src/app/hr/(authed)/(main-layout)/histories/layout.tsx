import { CirclePlus, SearchIcon } from "lucide-react";
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
        <h5 className="text-lg">นิสิตผ่านเข้าทำงาน</h5>
        <div className="flex rounded-lg overflow-hidden border border-primary mt-2">
          <Input className="rounded-none border-none" />
          <Button className="rounded-none w-10" size="icon">
            <SearchIcon />
          </Button>
        </div>
        <div className="mt-6 h-full overflow-hidden"></div>
      </div>

      <div className="rounded-lg bg-zinc-100 p-4 mt-0 ml-[308px]">
        {children}
      </div>
    </>
  );
}
