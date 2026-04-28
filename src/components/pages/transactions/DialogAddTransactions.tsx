"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { useIsMobile } from "@/hooks/use-mobile";
import { Check, ChevronDownIcon, PlusIcon } from "lucide-react";
import data_products from "@/app/data_products.json";
import z from "zod";
import { schema } from "@/model/schema-table";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function DialogAddTransactions() {
  const isMobile = useIsMobile();
  const products = data_products as z.infer<typeof schema>[];
  const products_name = products.map((product) => product.name);
  const [open, setOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [transactionType, setTransactionType] = useState<"IN" | "OUT">("IN");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-4.5 text-sm">
          <PlusIcon /> {isMobile ? "Add" : "Add Transaction"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Fill in the details for the new transaction. Click save when
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4 mt-6">
            <Field>
              <Label htmlFor="productName">Product Name</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="productName"
                    variant="outline"
                    role="combobox"
                    className="flex items-center justify-between font-normal"
                  >
                    {selectedProductName
                      ? selectedProductName
                      : "Find Product Name"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Command>
                    <CommandInput placeholder="Find Product Name..." />
                    <CommandList>
                      <CommandEmpty>No Product Found.</CommandEmpty>
                      <CommandGroup className="max-h-50 overflow-y-auto">
                        {products_name.map((item) => (
                          <CommandItem
                            key={item}
                            value={item}
                            onSelect={(currentValue) => {
                              setSelectedProductName(
                                currentValue === selectedProductName
                                  ? ""
                                  : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedProductName === item
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {item}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <Label htmlFor="transactionType">Transaction Type</Label>
              <Select
                defaultValue={transactionType}
                onValueChange={(v: typeof transactionType) => {
                  setTransactionType(v);
                }}
              >
                <SelectTrigger id="transactionType">
                  <SelectValue placeholder="Select Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="IN">IN</SelectItem>
                    <SelectItem value="OUT">OUT</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex items-center justify-between gap-x-2">
              <Field>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="teks"
                  inputMode="numeric"
                  placeholder="10"
                />
              </Field>
              <Field>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="teks"
                  inputMode="numeric"
                  placeholder="Rp10.000"
                />
              </Field>
            </div>
            <Field>
              <Label htmlFor="totalPrice">Total Price</Label>
              <Input
                id="totalPrice"
                type="teks"
                inputMode="numeric"
                placeholder="Rp10.000.000"
                disabled
                className="pointer-events-none select-none"
              />
            </Field>
            <Button type="submit">Save</Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
