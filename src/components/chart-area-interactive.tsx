"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", in: 222, out: 150 },
  { date: "2024-04-02", in: 97, out: 180 },
  { date: "2024-04-03", in: 167, out: 120 },
  { date: "2024-04-04", in: 242, out: 260 },
  { date: "2024-04-05", in: 373, out: 290 },
  { date: "2024-04-06", in: 301, out: 340 },
  { date: "2024-04-07", in: 245, out: 180 },
  { date: "2024-04-08", in: 409, out: 320 },
  { date: "2024-04-09", in: 59, out: 110 },
  { date: "2024-04-10", in: 261, out: 190 },
  { date: "2024-04-11", in: 327, out: 350 },
  { date: "2024-04-12", in: 292, out: 210 },
  { date: "2024-04-13", in: 342, out: 380 },
  { date: "2024-04-14", in: 137, out: 220 },
  { date: "2024-04-15", in: 120, out: 170 },
  { date: "2024-04-16", in: 138, out: 190 },
  { date: "2024-04-17", in: 446, out: 360 },
  { date: "2024-04-18", in: 364, out: 410 },
  { date: "2024-04-19", in: 243, out: 180 },
  { date: "2024-04-20", in: 89, out: 150 },
  { date: "2024-04-21", in: 137, out: 200 },
  { date: "2024-04-22", in: 224, out: 170 },
  { date: "2024-04-23", in: 138, out: 230 },
  { date: "2024-04-24", in: 387, out: 290 },
  { date: "2024-04-25", in: 215, out: 250 },
  { date: "2024-04-26", in: 75, out: 130 },
  { date: "2024-04-27", in: 383, out: 420 },
  { date: "2024-04-28", in: 122, out: 180 },
  { date: "2024-04-29", in: 315, out: 240 },
  { date: "2024-04-30", in: 454, out: 380 },
  { date: "2024-05-01", in: 165, out: 220 },
  { date: "2024-05-02", in: 293, out: 310 },
  { date: "2024-05-03", in: 247, out: 190 },
  { date: "2024-05-04", in: 385, out: 420 },
  { date: "2024-05-05", in: 481, out: 390 },
  { date: "2024-05-06", in: 498, out: 520 },
  { date: "2024-05-07", in: 388, out: 300 },
  { date: "2024-05-08", in: 149, out: 210 },
  { date: "2024-05-09", in: 227, out: 180 },
  { date: "2024-05-10", in: 293, out: 330 },
  { date: "2024-05-11", in: 335, out: 270 },
  { date: "2024-05-12", in: 197, out: 240 },
  { date: "2024-05-13", in: 197, out: 160 },
  { date: "2024-05-14", in: 448, out: 490 },
  { date: "2024-05-15", in: 473, out: 380 },
  { date: "2024-05-16", in: 338, out: 400 },
  { date: "2024-05-17", in: 499, out: 420 },
  { date: "2024-05-18", in: 315, out: 350 },
  { date: "2024-05-19", in: 235, out: 180 },
  { date: "2024-05-20", in: 177, out: 230 },
  { date: "2024-05-21", in: 82, out: 140 },
  { date: "2024-05-22", in: 81, out: 120 },
  { date: "2024-05-23", in: 252, out: 290 },
  { date: "2024-05-24", in: 294, out: 220 },
  { date: "2024-05-25", in: 201, out: 250 },
  { date: "2024-05-26", in: 213, out: 170 },
  { date: "2024-05-27", in: 420, out: 460 },
  { date: "2024-05-28", in: 233, out: 190 },
  { date: "2024-05-29", in: 78, out: 130 },
  { date: "2024-05-30", in: 340, out: 280 },
  { date: "2024-05-31", in: 178, out: 230 },
  { date: "2024-06-01", in: 178, out: 200 },
  { date: "2024-06-02", in: 470, out: 410 },
  { date: "2024-06-03", in: 103, out: 160 },
  { date: "2024-06-04", in: 439, out: 380 },
  { date: "2024-06-05", in: 88, out: 140 },
  { date: "2024-06-06", in: 294, out: 250 },
  { date: "2024-06-07", in: 323, out: 370 },
  { date: "2024-06-08", in: 385, out: 320 },
  { date: "2024-06-09", in: 438, out: 480 },
  { date: "2024-06-10", in: 155, out: 200 },
  { date: "2024-06-11", in: 92, out: 150 },
  { date: "2024-06-12", in: 492, out: 420 },
  { date: "2024-06-13", in: 81, out: 130 },
  { date: "2024-06-14", in: 426, out: 380 },
  { date: "2024-06-15", in: 307, out: 350 },
  { date: "2024-06-16", in: 371, out: 310 },
  { date: "2024-06-17", in: 475, out: 520 },
  { date: "2024-06-18", in: 107, out: 170 },
  { date: "2024-06-19", in: 341, out: 290 },
  { date: "2024-06-20", in: 408, out: 450 },
  { date: "2024-06-21", in: 169, out: 210 },
  { date: "2024-06-22", in: 317, out: 270 },
  { date: "2024-06-23", in: 480, out: 530 },
  { date: "2024-06-24", in: 132, out: 180 },
  { date: "2024-06-25", in: 141, out: 190 },
  { date: "2024-06-26", in: 434, out: 380 },
  { date: "2024-06-27", in: 448, out: 490 },
  { date: "2024-06-28", in: 149, out: 200 },
  { date: "2024-06-29", in: 103, out: 160 },
  { date: "2024-06-30", in: 446, out: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  in: {
    label: "Pemasukan",
    color: "var(--primary)",
  },
  out: {
    label: "Pengeluaran",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Penjualan</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Penjualan{" "}
            {timeRange === "90d"
              ? "3 bulan terakhir"
              : timeRange === "30d"
                ? "30 hari terakhir"
                : "7 hari terakhir"}
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPengeluaran" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-out)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-out)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillPemasukan" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-in)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-in)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="out"
              type="natural"
              fill="url(#fillPengeluaran)"
              stroke="var(--color-out)"
              strokeWidth={2}
            />
            <Area
              dataKey="in"
              type="natural"
              fill="url(#fillPemasukan)"
              stroke="var(--color-in)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
