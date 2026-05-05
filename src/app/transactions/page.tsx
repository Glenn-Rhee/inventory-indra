import CardsTransactions from "@/components/pages/transactions/CardsTransactions";
import SectionCards from "@/components/SectionCards";
import TableTransactions from "@/components/TableTransactions";
import table_transactions from "@/app/data_transactions.json";
import z from "zod";
import { schemaTransactions } from "@/model/schema-table";
import { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import DialogAddTransactions from "@/components/pages/transactions/DialogAddTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "Kelola dan pantau seluruh aktivitas transaksi produk, baik pemasukan maupun pengeluaran. Analisis pergerakan stok, hitung total transaksi, dan pastikan setiap perubahan tercatat dengan akurat.",
};

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-xl font-bold lg:text-3xl">Kelola Transaksi</h1>
            <p>
              Pantau dan catat aktivitas keluar masuk barang serta penjualan
            </p>
          </div>
          <SectionCards>
            <CardsTransactions />
          </SectionCards>
          <div className="w-full flex items-center justify-between">
            <SearchBar
              useFor="transaction"
              placeholder="Find Transactions..."
            />
            <DialogAddTransactions userId={session?.user.id || ""} />
          </div>
          <TableTransactions
            data={table_transactions as z.infer<typeof schemaTransactions>[]}
          />
        </div>
      </div>
    </div>
  );
}
