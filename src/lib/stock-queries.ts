import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BASEURL } from "./product-queries";
import { DataStockResponse, ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";
import { useImageUrl } from "@/store/image-url-store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface UseStocks {
  limit?: number;
  page?: number;
  userId: string;
}

export function useStocks(params: UseStocks) {
  const { limit = 10, page = 1, userId } = params;
  const { setImageUrl } = useImageUrl();
  const router = useRouter();

  return useQuery({
    queryKey: ["stocks", userId, limit, page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      try {
        const res = await fetch(
          BASEURL + `/stock?limit=${limit}&page=${page}`,
          {
            method: "GET",
            headers: {
              "x-user-id": userId,
            },
          },
        );

        const dataRes =
          (await res.json()) as ResponsePayload<DataStockResponse>;
        if (dataRes.status === "failed") {
          if (res.status === 401) {
            setImageUrl("");
            await signOut();
          }

          throw new ResponseError(res.status, dataRes.message);
        }

        return dataRes.data as DataStockResponse;
      } catch (error) {
        if (error instanceof ResponseError) {
          if (error.code === 401) {
            router.push("/auth/login");
          }
          toast.error(error.message);
        } else {
          toast.error("An error occured! Please try again later!");
        }

        return {
          Products: [],
          TotalLowStock: 0,
          TotalProduct: 0,
          TotalProductExpired: 0,
          TotalPages: 0,
        } as DataStockResponse;
      }
    },
  });
}
