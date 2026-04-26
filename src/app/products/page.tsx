import DialogAddProduct from "@/components/DialogAddProduct";
import SearchBar from "@/components/SearchBar";
import { Metadata } from "next";

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
            <DialogAddProduct />
          </div>
        </div>
      </div>
    </div>
  );
}
