import { DataStockResponse } from "@/types";

export function getProductExpired(products: DataStockResponse["Products"]) {
  if (products.length === 0) return "Produk masih kosong.";
  const expired = products.filter(
    (products) => products.StatusExpired === "EXPIRED",
  );
  if (expired.length === 0) return "Tidak ada produk yang kadaluarsa";
  if (expired.length === 1) return `${expired[0].Name} sudah kadaluarsa.`;
  if (expired.length === 2)
    return `${expired[0].Name} dan ${expired[1].Name} sudah kadaluarsa.`;
  let response = "";
  expired.forEach((product, i) => {
    if (i === expired.length - 1) {
      response += `dan ${product.Name} sudah kadaluarsa.`;
    } else {
      response += `${product.Name}, `;
    }
  });
  return response;
}
