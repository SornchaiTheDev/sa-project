"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import AnnouncementLink from "./AnnouncementLink";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/components/ui/skeleton";
import { fetchAnnouncementsFn } from "../_queryFns/fetchAnnouncementFn";
import { useRouter } from "next/navigation";

function AnnouncementList() {
  const { isLoading, data } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncementsFn,
  });

  const isNotFound = !isLoading && data?.announcements.length === 0;

  const router = useRouter();
  const createNewAnnouncement = () => {
    router.push("/hr/my-announcements");
  };

  return (
    <div className="fixed top-20 h-full w-[300px]  rounded-lg bg-zinc-100 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h5 className="text-lg">ประกาศงาน</h5>
          <Button
            onClick={createNewAnnouncement}
            variant="ghost"
            size="icon"
            className="w-8 h-8"
          >
            <CirclePlus size="1rem" className="text-primary" />
          </Button>
        </div>
      </div>
      <div className="mt-6 h-full overflow-hidden space-y-4">
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-4" />
          ))}

        {isNotFound && <h6 className="text-sm">ไม่พบประกาศ</h6>}

        {data?.announcements.map(({ id, name }) => (
          <AnnouncementLink
            key={id}
            href={`/hr/my-announcements/${id}`}
            {...{ name }}
          />
        ))}
      </div>
    </div>
  );
}

export default AnnouncementList;
