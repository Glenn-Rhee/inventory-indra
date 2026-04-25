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
  { date: "2024-04-01", medicine: 222, essentials: 150 },
  { date: "2024-04-02", medicine: 97, essentials: 180 },
  { date: "2024-04-03", medicine: 167, essentials: 120 },
  { date: "2024-04-04", medicine: 242, essentials: 260 },
  { date: "2024-04-05", medicine: 373, essentials: 290 },
  { date: "2024-04-06", medicine: 301, essentials: 340 },
  { date: "2024-04-07", medicine: 245, essentials: 180 },
  { date: "2024-04-08", medicine: 409, essentials: 320 },
  { date: "2024-04-09", medicine: 59, essentials: 110 },
  { date: "2024-04-10", medicine: 261, essentials: 190 },
  { date: "2024-04-11", medicine: 327, essentials: 350 },
  { date: "2024-04-12", medicine: 292, essentials: 210 },
  { date: "2024-04-13", medicine: 342, essentials: 380 },
  { date: "2024-04-14", medicine: 137, essentials: 220 },
  { date: "2024-04-15", medicine: 120, essentials: 170 },
  { date: "2024-04-16", medicine: 138, essentials: 190 },
  { date: "2024-04-17", medicine: 446, essentials: 360 },
  { date: "2024-04-18", medicine: 364, essentials: 410 },
  { date: "2024-04-19", medicine: 243, essentials: 180 },
  { date: "2024-04-20", medicine: 89, essentials: 150 },
  { date: "2024-04-21", medicine: 137, essentials: 200 },
  { date: "2024-04-22", medicine: 224, essentials: 170 },
  { date: "2024-04-23", medicine: 138, essentials: 230 },
  { date: "2024-04-24", medicine: 387, essentials: 290 },
  { date: "2024-04-25", medicine: 215, essentials: 250 },
  { date: "2024-04-26", medicine: 75, essentials: 130 },
  { date: "2024-04-27", medicine: 383, essentials: 420 },
  { date: "2024-04-28", medicine: 122, essentials: 180 },
  { date: "2024-04-29", medicine: 315, essentials: 240 },
  { date: "2024-04-30", medicine: 454, essentials: 380 },
  { date: "2024-05-01", medicine: 165, essentials: 220 },
  { date: "2024-05-02", medicine: 293, essentials: 310 },
  { date: "2024-05-03", medicine: 247, essentials: 190 },
  { date: "2024-05-04", medicine: 385, essentials: 420 },
  { date: "2024-05-05", medicine: 481, essentials: 390 },
  { date: "2024-05-06", medicine: 498, essentials: 520 },
  { date: "2024-05-07", medicine: 388, essentials: 300 },
  { date: "2024-05-08", medicine: 149, essentials: 210 },
  { date: "2024-05-09", medicine: 227, essentials: 180 },
  { date: "2024-05-10", medicine: 293, essentials: 330 },
  { date: "2024-05-11", medicine: 335, essentials: 270 },
  { date: "2024-05-12", medicine: 197, essentials: 240 },
  { date: "2024-05-13", medicine: 197, essentials: 160 },
  { date: "2024-05-14", medicine: 448, essentials: 490 },
  { date: "2024-05-15", medicine: 473, essentials: 380 },
  { date: "2024-05-16", medicine: 338, essentials: 400 },
  { date: "2024-05-17", medicine: 499, essentials: 420 },
  { date: "2024-05-18", medicine: 315, essentials: 350 },
  { date: "2024-05-19", medicine: 235, essentials: 180 },
  { date: "2024-05-20", medicine: 177, essentials: 230 },
  { date: "2024-05-21", medicine: 82, essentials: 140 },
  { date: "2024-05-22", medicine: 81, essentials: 120 },
  { date: "2024-05-23", medicine: 252, essentials: 290 },
  { date: "2024-05-24", medicine: 294, essentials: 220 },
  { date: "2024-05-25", medicine: 201, essentials: 250 },
  { date: "2024-05-26", medicine: 213, essentials: 170 },
  { date: "2024-05-27", medicine: 420, essentials: 460 },
  { date: "2024-05-28", medicine: 233, essentials: 190 },
  { date: "2024-05-29", medicine: 78, essentials: 130 },
  { date: "2024-05-30", medicine: 340, essentials: 280 },
  { date: "2024-05-31", medicine: 178, essentials: 230 },
  { date: "2024-06-01", medicine: 178, essentials: 200 },
  { date: "2024-06-02", medicine: 470, essentials: 410 },
  { date: "2024-06-03", medicine: 103, essentials: 160 },
  { date: "2024-06-04", medicine: 439, essentials: 380 },
  { date: "2024-06-05", medicine: 88, essentials: 140 },
  { date: "2024-06-06", medicine: 294, essentials: 250 },
  { date: "2024-06-07", medicine: 323, essentials: 370 },
  { date: "2024-06-08", medicine: 385, essentials: 320 },
  { date: "2024-06-09", medicine: 438, essentials: 480 },
  { date: "2024-06-10", medicine: 155, essentials: 200 },
  { date: "2024-06-11", medicine: 92, essentials: 150 },
  { date: "2024-06-12", medicine: 492, essentials: 420 },
  { date: "2024-06-13", medicine: 81, essentials: 130 },
  { date: "2024-06-14", medicine: 426, essentials: 380 },
  { date: "2024-06-15", medicine: 307, essentials: 350 },
  { date: "2024-06-16", medicine: 371, essentials: 310 },
  { date: "2024-06-17", medicine: 475, essentials: 520 },
  { date: "2024-06-18", medicine: 107, essentials: 170 },
  { date: "2024-06-19", medicine: 341, essentials: 290 },
  { date: "2024-06-20", medicine: 408, essentials: 450 },
  { date: "2024-06-21", medicine: 169, essentials: 210 },
  { date: "2024-06-22", medicine: 317, essentials: 270 },
  { date: "2024-06-23", medicine: 480, essentials: 530 },
  { date: "2024-06-24", medicine: 132, essentials: 180 },
  { date: "2024-06-25", medicine: 141, essentials: 190 },
  { date: "2024-06-26", medicine: 434, essentials: 380 },
  { date: "2024-06-27", medicine: 448, essentials: 490 },
  { date: "2024-06-28", medicine: 149, essentials: 200 },
  { date: "2024-06-29", medicine: 103, essentials: 160 },
  { date: "2024-06-30", medicine: 446, essentials: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
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
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
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
              dataKey="medicine"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="essentials"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
