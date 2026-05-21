import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { DataStatsResponse, ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";

export const metadata: Metadata = {
  title:,
  description:
    "Dashboard manajemen toko obat untuk memantau stok, penjualan, dan data obat secara real-time dengan sistem yang efisien dan terintegrasi.",
};

const BASEURL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

export default async function Page() {
  const session = await getServerSession(authOptions);
  let errorMsg: string | null = null;
  let data: DataStatsResponse = {
    BestSeller: "",
    Stocks: 0,
    TotalRevenue: 0,
    TotalTransactions: 0,
    DataChart: [],
  };
  try {
    const res = await fetch(BASEURL + "/stats?rangeType=90", {
      method: "GET",
      headers: {
        "x-user-id": session?.user.id || "",
      },
    });
    const dataRes = (await res.json()) as ResponsePayload<DataStatsResponse>;
    if (dataRes.status === "failed") {
      throw new ResponseError(res.status, dataRes.message);
    }
    data = dataRes.data;
  } catch (error) {
    if (error instanceof ResponseError) {
      errorMsg = error.message;
    } else {
      errorMsg = "An error occured! Please try again later.";
    }
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards errorMsg={errorMsg} data={data} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive
              userId={session?.user.id || ""}
              data={data.DataChart}
            />
          </div>
          <DataTable userId={session?.user.id || ""} />
        </div>
      </div>
    </div>
  );
}
