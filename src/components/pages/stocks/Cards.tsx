"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductExpired } from "@/helper/getProductExpired";
import { getProductLowStock } from "@/helper/getProductLowStock";
import { useStocks } from "@/lib/stock-queries";
import { TrendingUp } from "lucide-react";

interface CardsProps {
  userId: string;
}

export default function Cards(props: CardsProps) {
  const { userId } = props;
  const { data, isLoading } = useStocks({ userId });
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
          <CardDescription>Total Product</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.TotalProduct || 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          {data?.TotalProduct === 0 ? (
            "Belum ada produk"
          ) : (
            <>
              <p className="line-clamp-1 flex gap-2 font-medium">
                Naik 12.5% dari bulan lalu <TrendingUp className="size-4" />
              </p>
              <p className="text-muted-foreground">
                Pertumbuhan positif dalam jumlah produk.
              </p>
            </>
          )}
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Stock Menipis</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.TotalLowStock || 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <p className="line-clamp-1 flex gap-2 font-medium">
            {data?.TotalLowStock ?? 0} produk mendekati habis
          </p>
          <p className="text-muted-foreground">
            {getProductLowStock(data?.Products || [])}
          </p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Product Expired</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.TotalProductExpired || 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <p className="line-clamp-1 flex gap-2 font-medium">
            {data?.TotalProductExpired ?? 0} produk sudah kadaluarsa
          </p>
          <p className="text-muted-foreground">
            {getProductExpired(data?.Products ?? [])}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
