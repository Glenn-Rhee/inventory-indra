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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
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
import { useEffect, useState } from "react";
import z from "zod";
import { schema } from "@/model/schema-table";
import ValidationForm from "@/model/validation-form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormatNumber } from "@/helper/getFormattingNumber";
import { formatRupiah } from "@/helper/getFormatRupiah";
import { BASEURL } from "@/lib/product-queries";
import { useSession } from "next-auth/react";
import { ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface DialogEditProductProps {
  product: z.infer<typeof schema>;
}

type EDITPRODUCT = z.infer<typeof ValidationForm.EDITPRODUCT>;

export default function DialogEditProduct(props: DialogEditProductProps) {
  const { product } = props;
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const form = useForm<EDITPRODUCT>({
    resolver: zodResolver(ValidationForm.EDITPRODUCT),
    mode: "onChange",
    defaultValues: {
      category: product.Category,
      name: product.Name ?? "",
      price: product.Price,
    },
  });

  const watchedPrice = form.watch("price");
  const [displayPrice, setDisplayPrice] = useState(formatRupiah(watchedPrice));

  useEffect(() => {
    const parsed = getFormatNumber(watchedPrice);
    setDisplayPrice(formatRupiah(parsed));
  }, [watchedPrice]);

  async function handleSubmit(v: EDITPRODUCT) {
    setLoading(true);
    try {
      const res = await fetch(BASEURL + "/product", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": session?.user.id || "",
        },
        body: JSON.stringify({
          ...v,
          id: product.Id,
        }),
      });

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(res.status, dataRes.message);
      }
      toast.success(dataRes.message);
      setOpen(false);

      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured. Please try again later!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (loading) return;
        setOpen(v);
      }}
    >
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="w-full text-start hover:text-white"
      >
        <span>Edit</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={() => {
            form.handleSubmit(handleSubmit)();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for the product. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...field}
                    autoComplete="off"
                    type="text"
                    id="name"
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(v: EDITPRODUCT["category"]) => {
                      field.onChange(v);
                    }}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      id="category"
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="MEDICINE">MEDICINE</SelectItem>
                        <SelectItem value="ESSENTIALS">ESSENTIALS</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="price">Price per butir/item</Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    id="price"
                    name="price"
                    autoComplete="off"
                    placeholder={formatRupiah(field.value)}
                    value={displayPrice}
                    onChange={(e) => {
                      const parsed = getFormatNumber(e.target.value);
                      field.onChange(parsed);
                      setDisplayPrice(formatRupiah(parsed));
                    }}
                    onBlur={() => {
                      field.onBlur();
                      setDisplayPrice(formatRupiah(field.value));
                    }}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              disabled={loading}
              type="submit"
            >
              {loading ? "Saving ..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
