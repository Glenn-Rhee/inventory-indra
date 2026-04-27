import SearchBarStocks from "@/components/pages/stocks/SearchBarStocks";
import SectionCards from "@/components/SectionCards";
import TableStocks from "@/components/pages/stocks/TableStocks";
import { Metadata } from "next";
import data_stocks from "@/app/data_stocks.json";
import z from "zod";
import { schemaStocks } from "@/model/schema-table";
import Cards from "@/components/pages/stocks/Cards";
export const metadata: Metadata = {
  title: "Stocks",
  description:
    "Pantau dan kelola stok produk secara real-time. Lacak ketersediaan, perbarui jumlah stok, dan hindari kehabisan produk dengan mudah.",
};

export default function StocksPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-xl font-bold lg:text-3xl">Kelola Stocks</h1>
            <p>Pantau dan kelola stok produk secara real-time</p>
          </div>
          <SectionCards>
            <Cards />
          </SectionCards>
          <SearchBarStocks />
          <TableStocks data={data_stocks as z.infer<typeof schemaStocks>[]} />
        </div>
      </div>
    </div>
  );
}
