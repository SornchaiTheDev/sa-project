"use client";

import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  XAxis,
  Line,
  ComposedChart,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, average: 133 },
  { month: "February", desktop: 305, mobile: 200, average: 252 },
  { month: "March", desktop: 237, mobile: 120, average: 178 },
  { month: "April", desktop: 73, mobile: 190, average: 131 },
  { month: "May", desktop: 209, mobile: 130, average: 169 },
  { month: "June", desktop: 214, mobile: 140, average: 177 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  average: {
    label: "Average",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

function Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-32 w-7/12">
      <ComposedChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend
          content={<ChartLegendContent />}
          className="justify-start"
        />
        <Bar dataKey="desktop" fill="hsl(var(--chart-1))" maxBarSize={30} />
        <Bar dataKey="mobile" fill="hsl(var(--chart-3))" maxBarSize={30} />
        <Line dataKey="average" type="monotone" stroke="hsl(var(--chart-2))" />
      </ComposedChart>
    </ChartContainer>
  );
}

export default Chart;
