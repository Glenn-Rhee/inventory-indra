"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactions } from "@/lib/transaction-queries";
import { TrendingUp } from "lucide-react";

interface CardsTransactionsProps {
  userId: string;
}

export default function CardsTransactions(props: CardsTransactionsProps) {
  const { userId } = props;
  const { data, isLoading } = useTransactions({ userId });

  if (isLoading) {
    return (
      <>
        <Skeleton className="@container/card h-40" />
        <Skeleton className="@container/card" />
        <Skeleton className="@container/card" />
      </>
    );
  }

  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Transactions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.TotalTransaction || 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <p className="line-clamp-1 flex gap-2 font-medium">
            Naik 12.5% dari bulan lalu <TrendingUp className="size-4" />
          </p>
          <p className="text-muted-foreground">
            Aktivitas transaksi meningkat.
          </p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp{data?.TotalRevenue.toLocaleString("id-ID") || 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <p className="line-clamp-1 flex gap-2 font-medium">
            +8% dari periode sebelumnya <TrendingUp className="size-4" />
          </p>
          <p className="text-muted-foreground">
            Pendapatan dari penjualan meningkat.
          </p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Purchase</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp{data?.TotalPurchase.toLocaleString("id-ID") || 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <p className="line-clamp-1 flex gap-2 font-medium">
            Restock bulan ini meningkat 15% <TrendingUp className="size-4" />
          </p>
          <p className="text-muted-foreground">
            Pengeluaran untuk pembelian stok meningkat.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
