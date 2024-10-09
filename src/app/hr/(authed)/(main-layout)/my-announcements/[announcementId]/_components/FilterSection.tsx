"use client"
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib";

function FilterSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | "interview" | "job">(
    "all",
  );
  return (
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
      <Button
        variant="ghost"
        onClick={() => setActiveFilter("all")}
        className={cn(activeFilter === "all" && "text-primary")}
      >
        ผู้สมัครทั้งหมด
      </Button>
      <Button
        variant="ghost"
        onClick={() => setActiveFilter("interview")}
        className={cn(activeFilter === "interview" && "text-primary")}
      >
        ดำเนินการสัมภาษณ์
      </Button>
      <Button
        variant="ghost"
        onClick={() => setActiveFilter("job")}
        className={cn(activeFilter === "job" && "text-primary")}
      >
        ดำเนินการรับเข้าทำงาน
      </Button>
    </div>
  );
}

export default FilterSection;
