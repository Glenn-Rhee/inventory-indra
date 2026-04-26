import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-x-2">
      <Input
        placeholder="Find Product..."
        className="w-42 lg:w-82 xl:w-100 py-4"
      />
      <Button className="py-4.5">
        <SearchIcon />
      </Button>
    </div>
  );
}
