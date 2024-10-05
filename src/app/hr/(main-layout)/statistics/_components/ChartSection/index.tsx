import Chart from "./Chart";
import LeaderBoard from "./LeaderBoard";
import TimeFilter from "./TimeFilter";

function ChartSection() {
  return (
    <div className="border-2 border-primary p-4 rounded-lg flex flex-col flex-1 gap-4">
      <div className="flex items-center gap-4">
        <h5 className="text-xl font-semibold">จำนวนผู้ยื่นสมัคร</h5>
        <TimeFilter />
      </div>
      <div className="flex-1 flex gap-4">
        <Chart />
        <LeaderBoard />
      </div>
    </div>
  );
}

export default ChartSection;
