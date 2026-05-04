import ResponseError from "@/error/ResponseError";
import { DataProductResponse, ResponsePayload } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const BASEURL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

interface UseProducts {
  limit?: number;
  page?: number;
  userId: string;
}

export function useProducts(params: UseProducts) {
  const { limit = 10, page = 1, userId } = params;
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          BASEURL + `/product?limit=${limit}&page=${page}`,
          {
            method: "GET",
            headers: {
              "x-user-id": userId,
            },
          },
        );

        const json = (await res.json()) as ResponsePayload<DataProductResponse>;
        if (json.status === "failed") {
          throw new ResponseError(res.status, "Failed get data products!");
        }

        return json.data as DataProductResponse;
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
        return {
          Product: [],
          TotalPages: 0,
        } as DataProductResponse;
      }
    },
  });
}
