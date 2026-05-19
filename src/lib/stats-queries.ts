import { useQuery } from "@tanstack/react-query";
import { BASEURL } from "./product-queries";
import { DataStatsResponse, ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";
import { useImageUrl } from "@/store/image-url-store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface UseStats {
  timeRange: "90d" | "30d" | "7d";
  userId: string;
}

export function useStats(params: UseStats) {
  const { timeRange, userId } = params;
  const rangeType = timeRange.split("d")[0];
  const { setImageUrl } = useImageUrl();
  const router = useRouter();

  return useQuery({
    queryKey: ["stats", timeRange],
    queryFn: async () => {
      try {
        const res = await fetch(BASEURL + "/stats?rangeType=" + rangeType, {
          method: "GET",
          headers: {
            "x-user-id": userId,
          },
        });
        const dataRes =
          (await res.json()) as ResponsePayload<DataStatsResponse>;
        if (dataRes.status === "failed") {
          if (res.status === 401) {
            setImageUrl("");
            await signOut();
          }
          throw new ResponseError(res.status, dataRes.message);
        }

        return dataRes.data.DataChart;
      } catch (error) {
        if (error instanceof ResponseError) {
          if (error.code === 401) {
            router.push("/auth/login");
          }
          toast.error(error.message);
        } else {
          toast.error("An error occured! Please try again later.");
        }

        return [];
      }
    },
  });
}
