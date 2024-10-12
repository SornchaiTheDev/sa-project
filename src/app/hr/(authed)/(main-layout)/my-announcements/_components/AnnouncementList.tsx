"use client";

import { CirclePlus, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import AnnouncementLink from "./AnnouncementLink";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/components/ui/skeleton";
import { fetchAnnouncementsFn } from "../_queryFns/fetchAnnouncementFn";

function AnnouncementList() {
  const [search, setSearch] = useState("");

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => fetchAnnouncementsFn(search),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const isNotFound = !isLoading && data?.announcements.length === 0;

  return (
    <div className="fixed top-20 h-full w-[300px]  rounded-lg bg-zinc-100 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h5 className="text-lg">ประกาศงาน</h5>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <CirclePlus size="1rem" />
          </Button>
        </div>
      </div>
      <div className="flex rounded-lg overflow-hidden border border-primary mt-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-none border-none"
        />
        <Button
          onClick={() => refetch()}
          className="rounded-none w-10"
          size="icon"
        >
          <SearchIcon />
        </Button>
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
            href={`my-announcements/${id}`}
            {...{ name }}
          />
        ))}
      </div>
    </div>
  );
}

export default AnnouncementList;
