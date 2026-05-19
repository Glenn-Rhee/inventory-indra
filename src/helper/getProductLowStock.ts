import { DataStockResponse } from "@/types";

export function getProductLowStock(products: DataStockResponse["Products"]) {
  if (products.length === 0) return "-";
  const lowStock = products.filter(
    (product) => product.StatusStock === "LOW-STOCK",
  );
  if (lowStock.length === 0) return "-";
  if (lowStock.length === 1) return lowStock[0].Name;
  if (lowStock.length === 2) return `${lowStock[0].Name} dan ${lowStock[1].Name}`
  let response = "";
  lowStock.forEach((product, i) => {
    if (i === lowStock.length - 1){
        response += `dan ${product.Name}.`
    } else {
        response += `${product.Name}, `
    }
  })

  return response
}
