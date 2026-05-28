"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableTransactions from "./TableTransactions";
import TableProducts from "./pages/products/TableProducts";

interface DataTableProps {
  userId: string;
}

export function DataTable(props: DataTableProps) {
  const { userId } = props;
  return (
    <Tabs
      defaultValue="products"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="products">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="transactions">Transactions</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <TabsList className="hiddean **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="products"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <TableProducts userId={userId} />
      </TabsContent>
      <TabsContent value="transactions" className="flex flex-col px-4 lg:px-6">
        <TableTransactions userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
