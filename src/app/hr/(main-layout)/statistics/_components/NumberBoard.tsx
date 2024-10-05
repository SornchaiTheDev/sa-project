"use client";
import { useAtomValue } from "jotai";
import React from "react";
import { cardStatsAtom, type CompareStats } from "../store/stats-store";

const calcLastMonthPercentage = ({ total, lastMonth }: CompareStats) => {
  const calc = ((total - lastMonth) / Math.max(lastMonth, 1)) * 100;
  const display = calc.toFixed(2);
  if (calc > 0) return `+${display}`;
  return display;
};

interface StatsCard {
  title: string;
  value: CompareStats;
}

function NumberBoard() {
  const { jobs, applicants, accepted, waiting } = useAtomValue(cardStatsAtom);

  const statsCard: StatsCard[] = [
    {
      title: "จำนวนประกาศงานทั้งหมด",
      value: jobs,
    },
    {
      title: "จำนวนผู้ยื่นสมัครทั้งหมด",
      value: applicants,
    },
    {
      title: "จำนวนผู้รับสมัครทั้งหมด",
      value: accepted,
    },
    {
      title: "จำนวนผู้รอตรวจสอบทั้งหมด",
      value: waiting,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4">
      {statsCard.map(({ title, value }) => (
        <div
          key={title}
          className="col-span-3 relative border-2 border-primary p-4 rounded-lg bg-zinc-200/30"
        >
          <h5 className="text-lg">{title}</h5>
          <h2 className="text-2xl">{value.total}</h2>
          <h4 className="text-zinc-500">
            {calcLastMonthPercentage(value)}% จากเดือนที่แล้ว
          </h4>
        </div>
      ))}
    </div>
  );
}

export default NumberBoard;
