"use client";
import { useAtom } from "jotai";
import React from "react";
import { cn } from "~/lib";
import { chartFilterAtom, FilterChart } from "../../store/stats-store";

interface Filter {
  name: string;
  value: FilterChart;
}

function TimeFilter() {
  const [filter, setFilter] = useAtom(chartFilterAtom);
  const filters: Filter[] = [
    {
      name: "ปี",
      value: "year",
    },
    {
      name: "6 เดือน",
      value: "6-months",
    },
    {
      name: "3 เดือน",
      value: "3-months",
    },
    {
      name: "เดือน",
      value: "month",
    },
    {
      name: "สัปดาห์",
      value: "week",
    },
    {
      name: "วัน",
      value: "day",
    },
  ];
  return (
    <div className="p-1 rounded-lg border border-primary w-fit flex gap-2">
      {filters.map(({ name, value }) => (
        <button
          onClick={() => setFilter(value)}
          key={value}
          className={cn(
            "px-3 rounded-lg text-zinc-400",
            filter === value &&
              "bg-primary/50 text-black border border-primary",
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default TimeFilter;
