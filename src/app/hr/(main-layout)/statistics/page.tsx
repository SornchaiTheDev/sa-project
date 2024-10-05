import React from "react";
import CategoryFilter from "./_components/CategoryFilter";
import NumberBoard from "./_components/NumberBoard";
import ChartSection from "./_components/ChartSection";

function StatisticPage() {
  return (
    <div className="w-full bg-zinc-100 rounded-lg h-full p-4 flex flex-col gap-4">
      <CategoryFilter />
      <NumberBoard />
      <ChartSection />
    </div>
  );
}

export default StatisticPage;
