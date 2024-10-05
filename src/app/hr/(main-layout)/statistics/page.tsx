import { ChevronsUp } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib";
import BarChart from "./_components/BarChart";

function StatisticPage() {
  return (
    <div className="w-full bg-zinc-100 rounded-lg h-full p-4 flex flex-col gap-4">
      <h3 className="text-xl">Google Company</h3>

      <div className="p-1 rounded-md border border-primary w-fit">
        <Button className="py-1 px-3 h-7 bg-primary/50 text-black">
          ภาพรวม
        </Button>
        <Button className="py-1 px-3 h-7 bg-transparent shadow-none text-zinc-400 hover:bg-transparent">
          งานประจำ
        </Button>
        <Button className="py-1 px-3 h-7 bg-transparent shadow-none text-zinc-400 hover:bg-transparent">
          งานพิเศษ
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 relative border-2 border-primary p-4 rounded-lg">
          <ChevronsUp className="absolute rotate-45 right-2" />
          <h5 className="text-lg">จำนวนประกาศทั้งหมด</h5>
          <h2 className="text-2xl">XXX</h2>
          <h4 className="text-zinc-500">+ 21% from last month</h4>
        </div>
        <div className="col-span-3 relative border-2 border-primary p-4 rounded-lg">
          <ChevronsUp className="absolute rotate-45 right-2" />
          <h5 className="text-lg">จำนวนประกาศทั้งหมด</h5>
          <h2 className="text-2xl">XXX</h2>
          <h4 className="text-zinc-500">+ 21% from last month</h4>
        </div>
        <div className="col-span-3 relative border-2 border-primary p-4 rounded-lg">
          <ChevronsUp className="absolute rotate-45 right-2" />
          <h5 className="text-lg">จำนวนประกาศทั้งหมด</h5>
          <h2 className="text-2xl">XXX</h2>
          <h4 className="text-zinc-500">+ 21% from last month</h4>
        </div>
        <div className="col-span-3 relative border-2 border-primary p-4 rounded-lg">
          <ChevronsUp className="absolute rotate-45 right-2" />
          <h5 className="text-lg">จำนวนประกาศทั้งหมด</h5>
          <h2 className="text-2xl">XXX</h2>
          <h4 className="text-zinc-500">+ 21% from last month</h4>
        </div>
      </div>

      <div className="border-2 border-primary p-4 rounded-lg flex flex-col flex-1 gap-4">
        <div className="flex items-center gap-4">
          <h5 className="text-xl font-semibold">จำนวนผู้ยื่นสมัคร</h5>
          <div className="p-1 rounded-lg border border-primary w-fit flex gap-2">
            {["ปี", "6 เดือน", "3 เดือน", "เดือน", "สัปดาห์", "วัน"].map(
              (item, i) => (
                <button
                  key={item}
                  className={cn(
                    "px-3 rounded-lg text-zinc-400",
                    i === 5 && "bg-primary/50 text-black border border-primary",
                  )}
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="flex-1 flex gap-4">
          <BarChart />
          <div className="p-4 flex-1 rounded-lg border border-primary bg-primary/20 space-y-2">
            <h5 className="text-xl font-medium">จัดอันดับ</h5>
            <div className="flex justify-between gap-4">
              <h6 className="text-lg font-light flex-1">
                1. Software Engineering
              </h6>
              <h6 className="text-lg font-semibold">XXX (xx.xx%)</h6>
            </div>
            <div className="flex justify-between gap-4">
              <h6 className="text-lg font-light flex-1">2. UX/UI Designer</h6>
              <h6 className="text-lg font-semibold">XXX (xx.xx%)</h6>
            </div>
            <div className="flex justify-between gap-4">
              <h6 className="text-lg font-light flex-1">3. Graphic Designer</h6>
              <h6 className="text-lg font-semibold">XXX (xx.xx%)</h6>
            </div>
            <div className="flex justify-between gap-4">
              <h6 className="text-lg font-light flex-1">4. Nurse</h6>
              <h6 className="text-lg font-semibold">XX (xx.xx%)</h6>
            </div>
            <div className="flex justify-between gap-4">
              <h6 className="text-lg font-light flex-1">5. Data Scientist</h6>
              <h6 className="text-lg font-semibold">X (xx.xx%)</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticPage;
