"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRupiah } from "@/helper/getFormatRupiah";
import { DataStatsResponse } from "@/types";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

interface SectionCardsProps {
  data: Omit<DataStatsResponse, "DataChart">;
}

export function SectionCards(props: SectionCardsProps) {
  const { data } = props;
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Penjualan Obat</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(data.TotalRevenue)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Meningkat bulan ini <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Penjualan stabil</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Jumlah Transaksi</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.Stocks.toLocaleString("id-ID")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Turun 20% dari minggu lalu <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Mungkin dipengaruhi oleh faktor musiman atau promosi
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Stok Obat Tersedia</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.Stocks.toLocaleString("id-ID")}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <div className="line-clamp-1 flex gap-2 font-medium">Stok Aman</div>
          <div className="text-muted-foreground">
            Tidak ada kekurangan stok yang signifikan
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Produk terlaris</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.BestSeller}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Penjualan tertinggi bulan ini <TrendingUpIcon className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
