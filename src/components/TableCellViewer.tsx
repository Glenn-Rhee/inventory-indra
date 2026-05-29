import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import z from "zod";
import { schema } from "@/model/schema-table";
import { getFormatDate } from "@/helper/getFormatDate";

const chartConfig = {
  in: {
    label: "Income",
    color: "var(--primary)",
  },
  out: {
    label: "Outcome",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export default function TableCellViewer({
  item,
}: {
  item: z.infer<typeof schema>;
}) {
  const isMobile = useIsMobile();
  const chartData = item.Transactions;
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-foreground">
          {item.Name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.Name}</DrawerTitle>
          <DrawerDescription>
            Menampilkan transaksi {item.Name} selama 6 bulan terakhir.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="Month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="In"
                    type="natural"
                    fill="var(--color-in)"
                    fillOpacity={0.6}
                    stroke="var(--color-in)"
                    strokeWidth={2}
                  />
                  <Area
                    dataKey="Out"
                    type="natural"
                    fill="var(--color-out)"
                    fillOpacity={0.4}
                    strokeWidth={2}
                    stroke="var(--color-out)"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="text-muted-foreground">
                  Menampilkan grafik transaksi {item.Name} selama 6 bulan
                  terakhir. Grafik di atas menunjukkan jumlah transaksi
                  pembelian dan penjualan untuk produk {item.Name} selama
                  periode tersebut. Dengan informasi ini, Anda dapat
                  menganalisis tren penjualan dan pembelian untuk produk ini,
                  serta membuat keputusan yang lebih baik terkait persediaan dan
                  strategi pemasaran.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Product Name</Label>
              <Input disabled id="header" defaultValue={item.Name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Category</Label>
                <Select disabled defaultValue={item.Category}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MEDICINE">MEDICINE</SelectItem>
                      <SelectItem value="ESSENTIALS">ESSENTIALS</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Expired Status</Label>
                <Select disabled defaultValue={item.StatusExpired}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="SAFE">SAFE</SelectItem>
                      <SelectItem value="WARNING">WARNING</SelectItem>
                      <SelectItem value="EXPIRED">EXPIRED</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="price">Price</Label>
                <Input disabled id="price" defaultValue={item.Price} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="expired_date">Expired Date</Label>{" "}
                <Input
                  disabled
                  id="expired_date"
                  defaultValue={getFormatDate(item.ExpiredDate, true)}
                />
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
