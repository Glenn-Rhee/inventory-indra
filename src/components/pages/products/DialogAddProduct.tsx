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
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useEffect, useState } from "react";
import { DatePicker } from "../../DatePicker";
import { useIsMobile } from "@/hooks/use-mobile";
import DescribeTooltip from "./DescribeTooltip";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ValidationForm from "@/model/validation-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatRupiah } from "@/helper/getFormatRupiah";
import { getFormatNumber } from "@/helper/getFormattingNumber";
import { toast } from "sonner";
import { parsedStockAndPrice } from "@/helper/getParsingStockAndPrice";
import { BASEURL } from "@/lib/product-queries";
import { useSession } from "next-auth/react";
import { ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import { useQueryClient } from "@tanstack/react-query";

type CREATEPRODUCT = z.infer<typeof ValidationForm.CREATEPRODUCT>;

export default function DialogAddProduct() {
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stripPerDus, setStripPerDus] = useState<number>(0);
  const [butirPerStrip, setButirPerStrip] = useState<number>(0);
  const [itemPerDus, setItemPerDus] = useState<number>(0);
  const form = useForm<CREATEPRODUCT>({
    resolver: zodResolver(ValidationForm.CREATEPRODUCT),
    mode: "onChange",
    defaultValues: {
      category: "MEDICINE",
      expiredDate: new Date(),
      name: "",
      price: 0,
      stock: 0,
    },
  });
  const watchedCategory = form.watch("category");
  const watchedStock = form.watch("stock");
  const [unit, setUnit] = useState(
    watchedCategory === "MEDICINE" ? "STRIP" : "ITEM",
  );
  const watchedPrice = form.watch("price");
  const [displayPrice, setDisplayPrice] = useState(formatRupiah(watchedPrice));
  const queryClient = useQueryClient();

  useEffect(() => {
    const parsed = getFormatNumber(watchedStock);

    if (parsed !== watchedStock) {
      form.setValue("stock", parsed);
    }
  }, [watchedStock, form]);

  useEffect(() => {
    const parsed = getFormatNumber(watchedPrice);
    setDisplayPrice(formatRupiah(parsed));
  }, [watchedPrice]);

  useEffect(() => {
    setUnit(watchedCategory === "MEDICINE" ? "STRIP" : "ITEM");
  }, [watchedCategory]);

  async function handleSubmit(v: CREATEPRODUCT) {
    setLoading(true);
    if (v.category === "MEDICINE") {
      if (unit === "DUS" && (stripPerDus === 0 || butirPerStrip === 0)) {
        toast.error("Please fill all field!");
        return;
      }

      if (unit === "STRIP" && butirPerStrip === 0) {
        toast.error("Please fill all field!");
        return;
      }
    } else {
      if (unit === "DUS" && itemPerDus === 0) {
        toast.error("Please fill all field!");
        return;
      }
    }

    const parsed = parsedStockAndPrice({
      butirPerStrip,
      category: v.category,
      initPrice: v.price,
      initStock: v.stock,
      itemPerDus,
      stripPerDus,
      unit,
    });

    const data: CREATEPRODUCT = {
      ...v,
      price: parsed.price,
      stock: parsed.stock,
    };

    try {
      const res = await fetch(BASEURL + "/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": session?.user.id || "",
        },
        body: JSON.stringify(data),
      });

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(res.status, dataRes.message);
      }

      toast.success("Successfully create Product!!");
      setOpen(false);

      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error!");
      }
    } finally {
      setLoading(false);
    }

    setLoading(false);
    console.log(v);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (loading) return;
        setOpen(v);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="py-4.5 text-sm">
          <PlusIcon /> {isMobile ? "Add" : "Add Product"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(handleSubmit)();
          }}
        >
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details for the new product. Click save when
              you&apos;re done.
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
                    id="name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Paracetamol"
                    type="text"
                    {...field}
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
                    defaultValue={watchedCategory}
                    onValueChange={(v: typeof watchedCategory) => {
                      field.onChange(v);
                      setUnit(v === "MEDICINE" ? "STRIP" : "ITEM");
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
            <div className="flex items-center justify-between gap-x-3">
              <Controller
                control={form.control}
                name="stock"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="w-full space-y-1">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        type="text"
                        inputMode="numeric"
                        id="stock"
                        name="stock"
                        placeholder="10"
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
              <Field>
                <div className="w-full">
                  <Label htmlFor="unit">Unit</Label>
                  <Select defaultValue={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit" className="w-full mt-1.5">
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="DUS">DUS</SelectItem>
                        {watchedCategory === "MEDICINE" ? (
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
              </Field>
            </div>
            {watchedCategory === "MEDICINE" &&
              (unit === "STRIP" ? (
                <Field>
                  <Label htmlFor="totalQty">
                    Total Butir per Strip{" "}
                    <DescribeTooltip describe="Total jumlah butir obat dalam satu strip." />
                  </Label>
                  <Input
                    value={butirPerStrip}
                    onChange={(e) =>
                      setButirPerStrip(getFormatNumber(e.target.value))
                    }
                    type="text"
                    inputMode="numeric"
                    id="totalQty"
                    name="totalQty"
                    placeholder="10"
                  />
                </Field>
              ) : unit === "DUS" ? (
                <div className="flex items-center gap-x-2">
                  <Field>
                    <Label htmlFor="totalQtyDus">
                      Total Strip per Dus
                      <DescribeTooltip describe="Total jumlah strip obat dalam satu dus." />
                    </Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={stripPerDus}
                      onChange={(e) =>
                        setStripPerDus(getFormatNumber(e.target.value))
                      }
                      id="totalQtyDus"
                      name="totalQty"
                      placeholder="10"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="totalQtyStrip">
                      Total Butir per Strip{" "}
                      <DescribeTooltip describe="Total jumlah butir obat dalam satu strip." />
                    </Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={butirPerStrip}
                      onChange={(e) =>
                        setButirPerStrip(getFormatNumber(e.target.value))
                      }
                      id="totalQtyStrip"
                      name="totalQty"
                      placeholder="10"
                    />
                  </Field>
                </div>
              ) : null)}
            {watchedCategory === "ESSENTIALS" && unit === "DUS" && (
              <Field>
                <Label htmlFor="totalQtyDus">
                  Total Item per Dus{" "}
                  <DescribeTooltip describe="Total jumlah item brang dalam satu dus." />
                </Label>
                <Input
                  value={itemPerDus}
                  onChange={(e) =>
                    setItemPerDus(getFormatNumber(e.target.value))
                  }
                  type="text"
                  inputMode="numeric"
                  id="totalQtyDus"
                  name="totalQty"
                  placeholder="10"
                />
              </Field>
            )}
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="price">
                    Price per {unit[0]}
                    {unit.slice(1).toLowerCase()}
                  </Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    id="price"
                    name="price"
                    placeholder="Rp0"
                    autoComplete="off"
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

            <Controller
              name="expiredDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="expiredDate">Expired Date</Label>
                  <DatePicker date={field.value} setDate={field.onChange} />
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
            <Button disabled={loading} type="submit">
              {loading ? "Saving ..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
