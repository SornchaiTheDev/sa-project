"use client";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib";
import { getCandidates } from "../queryFns/getAllCandidates";
import { candidateAtom } from "../store/candidate-store";
import { getAllPosition } from "../queryFns/getAllPosition";

interface Props {
  announcementId: string;
}
function FilterSection({ announcementId }: Props) {
  const [activeFilter, setActiveFilter] = useState<"waiting" | "all">("all");
  const [position, setPosition] = useState<string>("all");

  const { data } = useQuery({
    queryKey: ["candidates", announcementId, activeFilter],
    queryFn: () => getCandidates(announcementId, position, activeFilter),
  });

  const setCandidates = useSetAtom(candidateAtom);

  useEffect(() => {
    if (!data) return;
    setCandidates(data);
  }, [data, setCandidates]);

  const totalCandidates = data?.length;

  const positions = useQuery({
    queryKey: ["positions", announcementId],
    queryFn: () => getAllPosition(announcementId),
  });

  return (
    <div className="mt-4 flex gap-4 items-center">
      <h5>{totalCandidates} ผู้สมัคร</h5>
      <Select value={position} onValueChange={setPosition}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="ตำแหน่ง" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>ตำแหน่ง</SelectLabel>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            {positions.data?.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        onClick={() => setActiveFilter("waiting")}
        className={cn(activeFilter === "waiting" && "text-primary")}
      >
        รอดำเนินการ
      </Button>
      <Button
        variant="ghost"
        onClick={() => setActiveFilter("all")}
        className={cn(activeFilter === "all" && "text-primary")}
      >
        ผู้สมัครทั้งหมด
      </Button>
    </div>
  );
}

export default FilterSection;
