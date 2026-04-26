"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useState } from "react";
import z from "zod";
import { schema } from "@/components/data-table";

interface DialogEditProductProps {
  product: z.infer<typeof schema>;
}

export default function DialogEditProduct(props: DialogEditProductProps) {
  const { product } = props;
  const [category, setCategory] = useState<"MEDICINE" | "ESSENTIALS">(
    product.category,
  );
  const [unit, setUnit] = useState(category === "MEDICINE" ? "STRIP" : "ITEM");

  return (
    <Dialog>
      <DialogTrigger className="w-full text-start hover:text-white">
        <span>Edit</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action="">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for the product. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder={product.name} />
            </Field>
            <Field>
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue={category}
                onValueChange={(v: typeof category) => {
                  setCategory(v);
                  setUnit(v === "MEDICINE" ? "STRIP" : "ITEM");
                }}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="MEDICINE">MEDICINE</SelectItem>
                    <SelectItem value="ESSENTIALS">ESSENTIALS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <div className="flex items-center justify-between gap-x-3">
                <div className="w-full space-y-1">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" name="stock" placeholder="10" />
                </div>
                <div className="w-full">
                  <Label htmlFor="unit">Unit</Label>
                  <Select defaultValue={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit" className="w-full mt-1.5">
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="DUS">DUS</SelectItem>
                        {category === "MEDICINE" ? (
                          <>
                            <SelectItem value="STRIP">STRIP</SelectItem>
                            <SelectItem value="BUTIR">BUTIR</SelectItem>
                          </>
                        ) : (
                          <SelectItem value="ITEM">ITEM</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Field>
            {category === "MEDICINE" &&
              (unit === "STRIP" ? (
                <Field>
                  <Label htmlFor="totalQty">Total Butir per Strip</Label>
                  <Input id="totalQty" name="totalQty" placeholder="10" />
                </Field>
              ) : unit === "DUS" ? (
                <div className="flex items-center gap-x-2">
                  <Field>
                    <Label htmlFor="totalQtyDus">Total Strip per Dus</Label>
                    <Input id="totalQtyDus" name="totalQty" placeholder="10" />
                  </Field>
                  <Field>
                    <Label htmlFor="totalQtyStrip">Total Butir per Strip</Label>
                    <Input
                      id="totalQtyStrip"
                      name="totalQty"
                      placeholder="10"
                    />
                  </Field>
                </div>
              ) : null)}
            {category === "ESSENTIALS" && unit === "DUS" && (
              <Field>
                <Label htmlFor="totalQtyDus">Total Item per Dus</Label>
                <Input id="totalQtyDus" name="totalQty" placeholder="10" />
              </Field>
            )}
            <Field>
              <Label htmlFor="price">
                Price per {unit[0]}
                {unit.slice(1).toLowerCase()}
              </Label>
              <Input
                id="price"
                name="price"
                placeholder={product.price.toLocaleString("id-ID")}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
