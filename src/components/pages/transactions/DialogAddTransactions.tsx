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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { useIsMobile } from "@/hooks/use-mobile";
import { Check, ChevronDownIcon, Loader2, PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
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
import { BASEURL, useProducts } from "@/lib/product-queries";
import { Separator } from "@/components/ui/separator";
import { DataProductResponse, ResponsePayload } from "@/types";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import ValidationForm from "@/model/validation-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatRupiah } from "@/helper/getFormatRupiah";
import { getFormatNumber } from "@/helper/getFormattingNumber";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { DatePicker } from "@/components/DatePicker";

interface DialogAddTransactionsProps {
  userId: string;
  useForPage?: "transaction" | "stock";
  productName?: string;
  price?: number;
}

type CREATETRANSACTION = z.infer<typeof ValidationForm.CREATETRANSACTION>;

export default function DialogAddTransactions(
  props: DialogAddTransactionsProps,
) {
  const { userId, useForPage = "transaction", productName, price = 0 } = props;
  const isMobile = useIsMobile();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: initialData, isFetching } = useProducts({
    userId,
    page: page + 1,
  });
  const [dataName, setDataName] = useState<DataProductResponse["Product"]>([]);
  const [open, setOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const form = useForm<CREATETRANSACTION>({
    resolver: zodResolver(ValidationForm.CREATETRANSACTION),
    mode: "onChange",
    defaultValues: {
      price,
      productName,
      quantity: 1,
      totalPrice: price * 1,
      transactionType: useForPage === "transaction" ? "IN" : "OUT",
      expiredDate: null,
    },
  });

  const watchedPrice = form.watch("price");
  const watchedQuantity = form.watch("quantity");
  const watchedTransactionType = form.watch("transactionType");
  const [displayPrice, setDisplayPrice] = useState(formatRupiah(watchedPrice));
  const [displayTotalPrice, setDisplayTotalPrice] = useState(
    formatRupiah(price * 1),
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (name === "productName" && values.productName !== "") {
        const dataPrice = dataName.find((dn) => dn.Name === values.productName);
        form.setValue("price", dataPrice?.Price || 0);
        setDisplayPrice(formatRupiah(dataPrice?.Price || 0));
        const totalPrice = (dataPrice?.Price || 0) * form.getValues("quantity");
        form.setValue("totalPrice", totalPrice);
        setDisplayTotalPrice(formatRupiah(totalPrice));
      }

      if(name === "price"){
        const totalPrice = (values.price ?? 0) * (values.quantity ?? 1)
        form.setValue("totalPrice", totalPrice)
        setDisplayTotalPrice(formatRupiah(totalPrice))
      }
    });

    return () => subscription.unsubscribe();
  }, [form, dataName]);

  useEffect(() => {
    const parsed = getFormatNumber(watchedQuantity);
    if (parsed !== watchedQuantity) {
      form.setValue("quantity", parsed);
      const totalPrice = parsed * form.getValues("price");
      form.setValue("totalPrice", totalPrice);
      setDisplayTotalPrice(formatRupiah(totalPrice));
    }
  }, [watchedQuantity, form]);

  useEffect(() => {
    if (!isFetching) {
      setDataName((prev) => {
        const newData = initialData?.Product || [];
        if (newData.length === 0) {
          setHasMore(false);
          return prev;
        }
        setHasMore(true);

        const existingIds = new Set(prev.map((p) => p.Id));
        const filtered = newData.filter((nd) => !existingIds.has(nd.Id));
        return [...prev, ...filtered];
      });
    }
  }, [isFetching, initialData]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isFetching && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        {
          threshold: 0.25,
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [isFetching, hasMore],
  );

  async function handleSubmit(v: CREATETRANSACTION) {
    setIsLoading(true);
    try {
      const product = dataName.find((dn) => dn.Name === v.productName);
      if (!product) {
        throw new ResponseError(403, "Please fill product name properly!");
      }

      if (v.transactionType === "OUT" && !v.expiredDate) {
        form.setError("expiredDate", { message: "Expired date is required!" });
        return;
      }

      const data = {
        productId: product.Id,
        transactionType: v.transactionType,
        quantity: v.quantity,
        price: v.price,
        expiredDate: v.expiredDate,
      };

      const res = await fetch(BASEURL + "/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify(data),
      });

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(res.status, dataRes.message);
      }

      setDialogOpen(false);
      toast.success(dataRes.message);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(v) => {
        if (isLoading) return;
        setDialogOpen(v);
      }}
    >
      <DialogTrigger asChild>
        {useForPage === "transaction" ? (
          <Button
            onClick={() => setDialogOpen(true)}
            className="py-4.5 text-sm"
          >
            <PlusIcon /> {isMobile ? "Add" : "Add Transaction"}
          </Button>
        ) : (
          <Button onClick={() => setDialogOpen(true)} className="text-sm">
            <PlusIcon className="size-3" /> Restock
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(handleSubmit)();
          }}
        >
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Fill in the details for the new transaction. Click save when
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4 mt-6">
            <Controller
              control={form.control}
              name="productName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="productName">Product Name</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={useForPage !== "transaction"}
                        id="productName"
                        variant="outline"
                        role="combobox"
                        className="flex items-center justify-between font-normal"
                      >
                        {field.value ? field.value : "Find Product Name"}
                        <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Command>
                        <CommandInput
                          aria-invalid={fieldState.invalid}
                          placeholder="Find Product Name..."
                        />
                        <CommandList
                          className="max-h-50 overflow-y-auto!"
                          onWheel={(e) => e.stopPropagation()}
                        >
                          {!isFetching && (
                            <CommandEmpty>No Product Found.</CommandEmpty>
                          )}
                          <CommandGroup>
                            {dataName.map((item, i) => (
                              <Fragment key={item.Id}>
                                <CommandItem
                                  ref={
                                    i === dataName.length - 3
                                      ? lastItemRef
                                      : undefined
                                  }
                                  value={item.Name}
                                  onSelect={(currentValue) => {
                                    field.onChange(
                                      currentValue === field.value
                                        ? ""
                                        : currentValue,
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === item.Name
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {item.Name}
                                </CommandItem>
                                <Separator className="w-full h-1" />
                              </Fragment>
                            ))}
                            {isFetching && (
                              <div className="flex mt-4 items-center justify-center w-full h-4">
                                <Loader2 className="size-4 animate-spin text-primary" />
                              </div>
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="transactionType"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="transactionType">Transaction Type</Label>
                  <Select
                    disabled={useForPage !== "transaction"}
                    aria-invalid={fieldState.invalid}
                    defaultValue={field.value}
                    onValueChange={(
                      v: CREATETRANSACTION["transactionType"],
                    ) => {
                      field.onChange(v);
                    }}
                    {...field}
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
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex items-center justify-between gap-x-2">
              <Controller
                control={form.control}
                name="quantity"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor="quantity">Quantity (butir/item)</Label>
                    <Input
                      id="quantity"
                      type="teks"
                      inputMode="numeric"
                      placeholder="10"
                      aria-invalid={fieldState.invalid}
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
                name="price"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id="price"
                      type="teks"
                      inputMode="numeric"
                      {...field}
                      placeholder="Rp0"
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
            </div>
            <Controller
              control={form.control}
              name="totalPrice"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="totalPrice">Total Price</Label>
                  <Input
                    aria-invalid={fieldState.invalid}
                    id="totalPrice"
                    type="teks"
                    inputMode="numeric"
                    placeholder="Rp0"
                    // disabled
                    className="pointer-events-none select-none"
                    {...field}
                    value={displayTotalPrice}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {watchedTransactionType === "OUT" && (
              <Controller
                control={form.control}
                name="expiredDate"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor="expiredDate">Expired Date</Label>
                    <DatePicker
                      date={field.value || undefined}
                      setDate={field.onChange}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Saving ..." : "Save"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
