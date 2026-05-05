"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { searchDataProduct } from "@/helper/searchData";
import { useDataStore } from "@/store/data-store";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder: string;
  useFor: "product" | "transaction" | "stock";
}

export default function SearchBar(props: SearchBarProps) {
  const { placeholder, useFor } = props;
  const [value, setValue] = useState<string>("");
  const { setDataProduct, originalDataProduct } = useDataStore();

  async function handleSearch() {
    switch (useFor) {
      case "product":
        const dataFiltered = await searchDataProduct({
          currentData: originalDataProduct,
          value,
        });
        setDataProduct(dataFiltered);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (value === "") {
      setDataProduct(originalDataProduct);
    }
  }, [value, originalDataProduct, setDataProduct]);

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
