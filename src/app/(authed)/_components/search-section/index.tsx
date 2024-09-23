"use client";
import { Search, Settings2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function SearchSection() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="relative mt-2">
        <Search
          className="absolute top-1/2 -translate-y-1/2 left-2"
          size="1rem"
        />
        <Input
          placeholder="ค้นหาตำแหน่งงาน"
          className="border-primary border pl-8 h-12"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-2 flex-wrap">
        <Select>
          <SelectTrigger className="border-primary w-fit">
            <SelectValue placeholder="พื้นที่ทำงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="border-primary w-fit">
            <SelectValue placeholder="สายอาชีพ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="border-primary w-fit">
            <SelectValue placeholder="ประเภทการจ้างงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div className="self-stretch w-1 border-r border-primary"></div>
        <Button size="icon" className="w-10" variant="ghost">
          <Settings2 size="1.25rem" />
        </Button>
      </div>
    </>
  );
}
