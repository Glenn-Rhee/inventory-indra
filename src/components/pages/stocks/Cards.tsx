import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
export default function Cards() {
  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Product</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            120
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <p className="line-clamp-1 flex gap-2 font-medium">
            Naik 12.5% dari bulan lalu <TrendingUp className="size-4" />
          </p>
          <p className="text-muted-foreground">
            Pertumbuhan positif dalam jumlah produk.
          </p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Stock Menipis</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <p className="line-clamp-1 flex gap-2 font-medium">
            5 produk mendekati habis
          </p>
          <p className="text-muted-foreground">
            Paracetamol, Amoxicillin, Vitamin C, Ibuprofen, dan Cetirizine.
          </p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Product Expired</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            2
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
          <p className="line-clamp-1 flex gap-2 font-medium">
            2 produk sudah kadaluarsa
          </p>
          <p className="text-muted-foreground">
            Paracetamol dan Amoxicillin sudah kadaluarsa.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
