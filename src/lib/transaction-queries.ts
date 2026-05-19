import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BASEURL } from "./product-queries";
import { DataTransactionResponse, ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";
import { useImageUrl } from "@/store/image-url-store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface UseTransactions {
  limit?: number;
  page?: number;
  userId: string;
}

export function useTransactions(params: UseTransactions) {
  const { userId, limit = 10, page = 1 } = params;
  const { setImageUrl } = useImageUrl();
  const router = useRouter();

  return useQuery({
    queryKey: ["transactions", userId, limit, page],
    placeholderData: keepPreviousData,
    queryFn: async (): Promise<DataTransactionResponse> => {
      try {
        const res = await fetch(
          BASEURL + `/transaction?limit=${limit}&page=${page}`,
          {
            method: "GET",
            headers: {
              "x-user-id": userId,
            },
          },
        );

        const dataRes =
          (await res.json()) as ResponsePayload<DataTransactionResponse>;
        if (dataRes.status === "failed") {
          if (res.status === 401) {
            setImageUrl("");
            await signOut();
          }
          throw new ResponseError(res.status, dataRes.message);
        }

        return dataRes.data;
      } catch (error) {
        if (error instanceof ResponseError) {
          if (error.code === 401) {
            router.push("/auth/login");
          }

          toast.error(error.message);
        } else {
          toast.error("An error occured! Please try again later.");
        }
        return {
          TotalPages: 0,
          TotalPurchase: 0,
          TotalRevenue: 0,
          TotalTransaction: 0,
          Transactions: [],
        };
      }
    },
  });
}
