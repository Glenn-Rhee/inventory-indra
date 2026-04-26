import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";

export default function SearchBarStocks() {
  return (
    <div className="flex items-center gap-x-2">
      <Label
        htmlFor="search"
        className="flex w-full lg:w-86 xl:w-120 items-center px-2 rounded-lg border border-black/20 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"
      >
        <SearchIcon className="size-5 text-muted-foreground" />
        <input
          className="w-full px-3 py-2 font-normal outline-none border-none bg-transparent"
          id="search"
          placeholder="Find Product Stocks..."
        />
      </Label>
      <Button className="py-4.5 px-4 lg:px-6 xl:px-8">Search</Button>
    </div>
  );
}
