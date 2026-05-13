"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { searchDataProduct, searchDataStock } from "@/helper/searchData";
import { useDataStore } from "@/store/data-store";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder: string;
  useFor: "product" | "transaction" | "stock";
}

export default function SearchBar(props: SearchBarProps) {
  const { placeholder, useFor } = props;
  const [value, setValue] = useState<string>("");
  const {
    setDataProduct,
    originalDataProduct,
    setIsLoading,
    originalDataStock,
    setDataStock,
  } = useDataStore();
  const { data: session } = useSession();
  async function handleSearch() {
    setIsLoading(true);
    switch (useFor) {
      case "product":
        const dataFiltered = await searchDataProduct({
          currentData: originalDataProduct,
          value,
          userId: session?.user.id || "",
        });
        setDataProduct(dataFiltered);
        break;
      case "stock":
        const dataFilteredStock = await searchDataStock({
          currentData: originalDataStock,
          userId: session?.user.id || "",
          value: value,
        });
        setDataStock(dataFilteredStock);
        break;
      default:
        break;
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (value === "") {
      setDataProduct(originalDataProduct);
      setDataStock(originalDataStock);
    }
  }, [
    value,
    originalDataProduct,
    setDataProduct,
    originalDataStock,
    setDataStock,
  ]);

  return (
    <div className="flex items-center gap-x-2">
      <Label
        htmlFor="search"
        className="flex w-full lg:w-86 xl:w-120 items-center px-2 rounded-lg border border-black/20 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"
      >
        <SearchIcon className="size-5 text-muted-foreground" />
        <input
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 font-normal outline-none border-none bg-transparent"
          id="search"
          placeholder={placeholder}
        />
      </Label>
      <Button onClick={handleSearch} className="py-4.5 px-4 lg:px-6 xl:px-8">
        Search
      </Button>
    </div>
  );
}
