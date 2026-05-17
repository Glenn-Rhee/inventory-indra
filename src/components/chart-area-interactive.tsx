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
import { DataStatsResponse } from "@/types";
import { useStats } from "@/lib/stats-queries";
import { cn } from "@/lib/utils";

export const description = "An interactive area chart";

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

interface ChartAreaInteractiveProps {
  data: DataStatsResponse["DataChart"];
  userId: string;
}

export function ChartAreaInteractive(props: ChartAreaInteractiveProps) {
  const { data: chartData, userId } = props;
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);
  const [dataChart, setDataChart] =
    React.useState<DataStatsResponse["DataChart"]>(chartData);
  const { data: dataRefetch, isLoading } = useStats({ timeRange, userId });

  React.useEffect(() => {
    if (!isLoading) {
      setDataChart(dataRefetch ?? []);
    }
  }, [timeRange, isLoading, dataRefetch]);
  const filteredData = dataChart.filter((item) => {
    const date = new Date(item.Date);
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
          {[
            { label: "Last 3 months", value: "90d" },
            { label: "Last 30 days", value: "30d" },
            { label: "Last 7 days", value: "7d" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setTimeRange(item.value as typeof timeRange)}
              className={cn(
                `px-4 py-1 rounded-md border text-sm transition-colors`,
                timeRange === item.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-muted",
              )}
            >
              {item.label}
            </button>
          ))}
          <Select
            value={timeRange}
            onValueChange={(e: typeof timeRange) => setTimeRange(e)}
          >
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
              dataKey="Date"
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
              dataKey="Out"
              type="natural"
              fill="url(#fillPengeluaran)"
              stroke="var(--color-out)"
              strokeWidth={2}
            />
            <Area
              dataKey="In"
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
