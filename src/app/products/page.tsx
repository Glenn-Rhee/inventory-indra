import DialogProduct from "@/components/DialogProduct";
import SearchBar from "@/components/SearchBar";
import TableProducts from "@/components/TableProducts";
import { Metadata } from "next";
import data_products from "@/app/data_products.json";
import { schema } from "@/components/data-table";
import z from "zod";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Kelola data produk obat-obatan dan kebutuhan pokok. Tambah, edit, dan pantau stok produk secara efisien.",
};

export default function ProductsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex w-full justify-between">
            <SearchBar />
            <DialogProduct />
          </div>
          <TableProducts
            isPageProduct
            data={data_products as z.infer<typeof schema>[]}
          />
        </div>
      </div>
    </div>
  );
}
