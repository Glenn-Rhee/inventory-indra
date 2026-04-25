"use client";
import * as React from "react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
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
import TableProducts from "./TableProducts";
import data_transactions from "@/app/data_transactions.json";
import TableTransactions from "./TableTransactions";

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

export const schemaTransactions = z.object({
  product_id: z.number(),
  transaction_type: z.enum(["IN", "OUT"]),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
  transaction_date: z.string(),
});

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [dataTransactions, setDataTrasactions] = React.useState<
    z.infer<typeof schemaTransactions>[]
  >(() => data_transactions as z.infer<typeof schemaTransactions>[]);

  return (
    <Tabs
      defaultValue="transactions"
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
        <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="transactions">
            Transactions <Badge variant="secondary">3</Badge>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="products"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <TableProducts data={data} setData={setData} />
      </TabsContent>
      <TabsContent value="transactions" className="flex flex-col px-4 lg:px-6">
        <TableTransactions
          data={dataTransactions}
          setData={setDataTrasactions}
        />
      </TabsContent>
    </Tabs>
  );
}
