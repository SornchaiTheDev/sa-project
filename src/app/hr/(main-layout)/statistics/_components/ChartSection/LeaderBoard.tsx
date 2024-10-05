"use client";
import { useAtomValue } from "jotai";
import React from "react";
import { leaderboardAtom } from "../../store/stats-store";

function LeaderBoard() {
  const datas = useAtomValue(leaderboardAtom);

  return (
    <div className="p-4 flex-1 rounded-lg border border-primary bg-primary/20 space-y-2">
      <h5 className="text-xl font-medium">จัดอันดับ</h5>
      {datas.map(({ name, amount, percentage }, i) => (
        <div key={name} className="flex justify-between gap-4">
          <h6 className="text-lg font-light flex-1">
            {i + 1}. {name}
          </h6>
          <h6 className="text-lg font-semibold">
            {amount} ({percentage}%)
          </h6>
        </div>
      ))}
    </div>
  );
}

export default LeaderBoard;
