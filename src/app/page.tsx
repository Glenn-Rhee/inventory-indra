import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Pag",
  description:
    "Dashboard manajemen toko obat untuk memantau stok, penjualan, dan data obat secara real-time dengan sistem yang efisien dan terintegrasi.",
};

export default function Page() { // Component
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable />
        </div>
      </div>
    </div>
  );
}
