import SearchBar from "@/components/SearchBar";
import SectionCards from "@/components/SectionCards";
import TableStocks from "@/components/pages/stocks/TableStocks";
import { Metadata } from "next";
import Cards from "@/components/pages/stocks/Cards";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export const metadata: Metadata = {
  title: "Stocks",
  description:
    "Pantau dan kelola stok produk secara real-time. Lacak ketersediaan, perbarui jumlah stok, dan hindari kehabisan produk dengan mudah.",
};

export default async function StocksPage() {
  const session = await getServerSession(authOptions);

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
          <SearchBar useFor="stock" placeholder="Find Product Stocks..." />
          <TableStocks userId={session?.user.id || ""} />
        </div>
      </div>
    </div>
  );
}
