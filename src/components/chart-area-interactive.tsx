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
  { date: "2024-04-01", medicine: 222, houseHold: 150 },
  { date: "2024-04-02", medicine: 97, houseHold: 180 },
  { date: "2024-04-03", medicine: 167, houseHold: 120 },
  { date: "2024-04-04", medicine: 242, houseHold: 260 },
  { date: "2024-04-05", medicine: 373, houseHold: 290 },
  { date: "2024-04-06", medicine: 301, houseHold: 340 },
  { date: "2024-04-07", medicine: 245, houseHold: 180 },
  { date: "2024-04-08", medicine: 409, houseHold: 320 },
  { date: "2024-04-09", medicine: 59, houseHold: 110 },
  { date: "2024-04-10", medicine: 261, houseHold: 190 },
  { date: "2024-04-11", medicine: 327, houseHold: 350 },
  { date: "2024-04-12", medicine: 292, houseHold: 210 },
  { date: "2024-04-13", medicine: 342, houseHold: 380 },
  { date: "2024-04-14", medicine: 137, houseHold: 220 },
  { date: "2024-04-15", medicine: 120, houseHold: 170 },
  { date: "2024-04-16", medicine: 138, houseHold: 190 },
  { date: "2024-04-17", medicine: 446, houseHold: 360 },
  { date: "2024-04-18", medicine: 364, houseHold: 410 },
  { date: "2024-04-19", medicine: 243, houseHold: 180 },
  { date: "2024-04-20", medicine: 89, houseHold: 150 },
  { date: "2024-04-21", medicine: 137, houseHold: 200 },
  { date: "2024-04-22", medicine: 224, houseHold: 170 },
  { date: "2024-04-23", medicine: 138, houseHold: 230 },
  { date: "2024-04-24", medicine: 387, houseHold: 290 },
  { date: "2024-04-25", medicine: 215, houseHold: 250 },
  { date: "2024-04-26", medicine: 75, houseHold: 130 },
  { date: "2024-04-27", medicine: 383, houseHold: 420 },
  { date: "2024-04-28", medicine: 122, houseHold: 180 },
  { date: "2024-04-29", medicine: 315, houseHold: 240 },
  { date: "2024-04-30", medicine: 454, houseHold: 380 },
  { date: "2024-05-01", medicine: 165, houseHold: 220 },
  { date: "2024-05-02", medicine: 293, houseHold: 310 },
  { date: "2024-05-03", medicine: 247, houseHold: 190 },
  { date: "2024-05-04", medicine: 385, houseHold: 420 },
  { date: "2024-05-05", medicine: 481, houseHold: 390 },
  { date: "2024-05-06", medicine: 498, houseHold: 520 },
  { date: "2024-05-07", medicine: 388, houseHold: 300 },
  { date: "2024-05-08", medicine: 149, houseHold: 210 },
  { date: "2024-05-09", medicine: 227, houseHold: 180 },
  { date: "2024-05-10", medicine: 293, houseHold: 330 },
  { date: "2024-05-11", medicine: 335, houseHold: 270 },
  { date: "2024-05-12", medicine: 197, houseHold: 240 },
  { date: "2024-05-13", medicine: 197, houseHold: 160 },
  { date: "2024-05-14", medicine: 448, houseHold: 490 },
  { date: "2024-05-15", medicine: 473, houseHold: 380 },
  { date: "2024-05-16", medicine: 338, houseHold: 400 },
  { date: "2024-05-17", medicine: 499, houseHold: 420 },
  { date: "2024-05-18", medicine: 315, houseHold: 350 },
  { date: "2024-05-19", medicine: 235, houseHold: 180 },
  { date: "2024-05-20", medicine: 177, houseHold: 230 },
  { date: "2024-05-21", medicine: 82, houseHold: 140 },
  { date: "2024-05-22", medicine: 81, houseHold: 120 },
  { date: "2024-05-23", medicine: 252, houseHold: 290 },
  { date: "2024-05-24", medicine: 294, houseHold: 220 },
  { date: "2024-05-25", medicine: 201, houseHold: 250 },
  { date: "2024-05-26", medicine: 213, houseHold: 170 },
  { date: "2024-05-27", medicine: 420, houseHold: 460 },
  { date: "2024-05-28", medicine: 233, houseHold: 190 },
  { date: "2024-05-29", medicine: 78, houseHold: 130 },
  { date: "2024-05-30", medicine: 340, houseHold: 280 },
  { date: "2024-05-31", medicine: 178, houseHold: 230 },
  { date: "2024-06-01", medicine: 178, houseHold: 200 },
  { date: "2024-06-02", medicine: 470, houseHold: 410 },
  { date: "2024-06-03", medicine: 103, houseHold: 160 },
  { date: "2024-06-04", medicine: 439, houseHold: 380 },
  { date: "2024-06-05", medicine: 88, houseHold: 140 },
  { date: "2024-06-06", medicine: 294, houseHold: 250 },
  { date: "2024-06-07", medicine: 323, houseHold: 370 },
  { date: "2024-06-08", medicine: 385, houseHold: 320 },
  { date: "2024-06-09", medicine: 438, houseHold: 480 },
  { date: "2024-06-10", medicine: 155, houseHold: 200 },
  { date: "2024-06-11", medicine: 92, houseHold: 150 },
  { date: "2024-06-12", medicine: 492, houseHold: 420 },
  { date: "2024-06-13", medicine: 81, houseHold: 130 },
  { date: "2024-06-14", medicine: 426, houseHold: 380 },
  { date: "2024-06-15", medicine: 307, houseHold: 350 },
  { date: "2024-06-16", medicine: 371, houseHold: 310 },
  { date: "2024-06-17", medicine: 475, houseHold: 520 },
  { date: "2024-06-18", medicine: 107, houseHold: 170 },
  { date: "2024-06-19", medicine: 341, houseHold: 290 },
  { date: "2024-06-20", medicine: 408, houseHold: 450 },
  { date: "2024-06-21", medicine: 169, houseHold: 210 },
  { date: "2024-06-22", medicine: 317, houseHold: 270 },
  { date: "2024-06-23", medicine: 480, houseHold: 530 },
  { date: "2024-06-24", medicine: 132, houseHold: 180 },
  { date: "2024-06-25", medicine: 141, houseHold: 190 },
  { date: "2024-06-26", medicine: 434, houseHold: 380 },
  { date: "2024-06-27", medicine: 448, houseHold: 490 },
  { date: "2024-06-28", medicine: 149, houseHold: 200 },
  { date: "2024-06-29", medicine: 103, houseHold: 160 },
  { date: "2024-06-30", medicine: 446, houseHold: 400 },
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
              dataKey="houseHold"
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
