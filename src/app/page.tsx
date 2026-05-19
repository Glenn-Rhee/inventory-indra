import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { DataStatsResponse, ResponsePayload } from "@/types";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Dashboard manajemen toko obat untuk memantau stok, penjualan, dan data obat secara real-time dengan sistem yang efisien dan terintegrasi.",
};

const BASEURL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

export default async function Page() {
  const session = await getServerSession(authOptions);
  const res = await fetch(BASEURL + "/stats?rangeType=90", {
    method: "GET",
    headers: {
      "x-user-id": session?.user.id || "",
    },
  });

  const dataRes = (await res.json()) as ResponsePayload<DataStatsResponse>;
  const data = dataRes.data;
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {dataRes.status === "failed" ? (
            <SectionCards
              data={{
                BestSeller: "",
                Stocks: 0,
                TotalRevenue: 0,
                TotalTransactions: 0,
              }}
            />
          ) : (
            <SectionCards data={data} />
          )}
          <div className="px-4 lg:px-6">
            {dataRes.status === "failed" ? (
              <ChartAreaInteractive userId={session?.user.id || ""} data={[]} />
            ) : (
              <ChartAreaInteractive
                userId={session?.user.id || ""}
                data={data.DataChart}
              />
            )}
          </div>
          <DataTable userId={session?.user.id || ""} />
        </div>
      </div>
    </div>
  );
}
