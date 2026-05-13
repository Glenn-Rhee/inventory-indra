import {
  DataProductResponse,
  DataStockResponse,
  ResponsePayload,
} from "@/types";
import { getFormatDate } from "./getFormatDate";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";

const BASEURL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
export async function searchDataProduct(dataSearch: {
  value: string;
  currentData: DataProductResponse["Product"];
  userId: string;
}): Promise<DataProductResponse["Product"]> {
  const value = dataSearch.value.toLowerCase();

  const filterByName = dataSearch.currentData.filter((curr) =>
    curr.Name.toLowerCase().includes(value),
  );
  if (filterByName.length > 0) return filterByName;

  const filterByCategory = dataSearch.currentData.filter((curr) =>
    curr.Category.toLowerCase().includes(value),
  );
  if (filterByCategory.length > 0) return filterByCategory;

  const filterByPrice = dataSearch.currentData.filter((curr) =>
    curr.Price.toString().includes(value),
  );
  if (filterByPrice.length > 0) return filterByPrice;

  const filterByStatusExp = dataSearch.currentData.filter((curr) =>
    curr.StatusExpired.toLowerCase().includes(value),
  );
  if (filterByStatusExp.length > 0) return filterByStatusExp;

  const filterByExpDate = dataSearch.currentData.filter((curr) => {
    const formatDate = getFormatDate(curr.ExpiredDate);
    return formatDate.toLowerCase().includes(value);
  });

  if (filterByStatusExp.length > 0) return filterByExpDate;

  try {
    const res = await fetch(
      BASEURL + "/product?limit=10&page=1&filter=" + value,
      {
        method: "GET",
        headers: {
          "x-user-id": dataSearch.userId,
        },
      },
    );

    const dataRes = (await res.json()) as ResponsePayload<DataProductResponse>;
    if (dataRes.status === "failed") {
      throw new ResponseError(res.status, dataRes.message);
    }

    return dataRes.data.Product;
  } catch (error) {
    if (error instanceof ResponseError) {
      toast.error(error.message);
    } else {
      toast.error("An error occured! Please try again later");
    }
    return [];
  }
}

export async function searchDataStock(dataSearch: {
  value: string;
  currentData: DataStockResponse["Products"];
  userId: string;
}) {
  const value = dataSearch.value.toLowerCase();
  const filterByName = dataSearch.currentData.filter((curr) =>
    curr.Name.toLowerCase().includes(value),
  );

  if (filterByName.length > 0) return filterByName;
  try {
    const res = await fetch(
      BASEURL + "/stock?limit=10&page=1&filter=" + value,
      {
        method: "GET",
        headers: {
          "x-user-id": dataSearch.userId,
        },
      },
    );

    const dataRes = (await res.json()) as ResponsePayload<DataStockResponse>;
    if (dataRes.status === "failed") {
      throw new ResponseError(res.status, dataRes.message);
    }

    return dataRes.data.Products;
  } catch (error) {
    if (error instanceof ResponseError) {
      toast.error(error.message);
    } else {
      toast.error("An error occured! Please try again later");
    }
    return [];
  }
}
