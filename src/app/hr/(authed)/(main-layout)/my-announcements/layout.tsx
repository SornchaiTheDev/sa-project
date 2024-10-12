import React from "react";
import AnnouncementList from "./_components/AnnouncementList";

export default function MyAnnouncementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementList />
      <div className="rounded-lg bg-zinc-100 p-4 mt-0 ml-[308px] relative">
        {children}
      </div>
    </>
  );
}
