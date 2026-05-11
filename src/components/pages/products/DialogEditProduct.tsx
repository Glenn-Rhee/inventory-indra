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
import { schema } from "@/model/schema-table";

interface DialogEditProductProps {
  product: z.infer<typeof schema>;
}

export default function DialogEditProduct(props: DialogEditProductProps) {
  const { product } = props;
  const [category, setCategory] = useState<"MEDICINE" | "ESSENTIALS">(
    product.Category,
  );

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
              <Input id="name" name="name" placeholder={product.Name} />
            </Field>
            <Field>
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue={category}
                onValueChange={(v: typeof category) => {
                  setCategory(v);
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
              <Label htmlFor="price">Price per butir/item</Label>
              <Input
                id="price"
                name="price"
                placeholder={product.Price.toLocaleString("id-ID")}
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
