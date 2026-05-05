import { DataProductResponse } from "@/types";
import { getFormatDate } from "./getFormatDate";

export async function searchDataProduct(dataSearch: {
  value: string;
  currentData: DataProductResponse["Product"];
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

  return [];
}
