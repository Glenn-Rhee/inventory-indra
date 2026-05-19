import ResponseError from "@/error/ResponseError";
import { useImageUrl } from "@/store/image-url-store";
import { DataProductResponse, ResponsePayload } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const BASEURL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

interface UseProducts {
  limit?: number;
  page?: number;
  userId: string;
}

export function useProducts(params: UseProducts) {
  const { limit = 10, page = 1, userId } = params;
  const { setImageUrl } = useImageUrl();
  const router = useRouter();
  return useQuery({
    queryKey: ["products", userId, limit, page],
    placeholderData: keepPreviousData,
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
          if (res.status === 401) {
            setImageUrl("");
            await signOut();
          }
          throw new ResponseError(res.status, json.message);
        }

        return json.data as DataProductResponse;
      } catch (error) {
        if (error instanceof ResponseError) {
          if (error.code === 401) {
            router.push("/auth/login");
          }
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
