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
import { useProducts } from "@/lib/product-queries";
import { Separator } from "@/components/ui/separator";
import { DataProductResponse } from "@/types";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import ValidationForm from "@/model/validation-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatRupiah } from "@/helper/getFormatRupiah";
import { getFormatNumber } from "@/helper/getFormattingNumber";

interface DialogAddTransactionsProps {
  userId: string;
}

type CREATETRANSACTION = z.infer<typeof ValidationForm.CREATETRANSACTION>;

export default function DialogAddTransactions(
  props: DialogAddTransactionsProps,
) {
  const { userId } = props;
  const isMobile = useIsMobile();
  const [page, setPage] = useState(0);
  const { data: initialData, isFetching } = useProducts({
    userId,
    page: page + 1,
  });
  const [open, setOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [dataName, setDataName] = useState<DataProductResponse["Product"]>([]);
  const [hasMore, setHasMore] = useState(true);
  const form = useForm<CREATETRANSACTION>({
    resolver: zodResolver(ValidationForm.CREATETRANSACTION),
    mode: "onChange",
    defaultValues: {
      price: 0,
      productName: "",
      quantity: 0,
      totalPrice: 0,
      transactionType: "IN",
    },
  });
  const watchedPrice = form.watch("price");
  const [displayPrice, setDisplayPrice] = useState(formatRupiah(watchedPrice));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = form.watch((values, { name }) => {
      if (name === "quantity") {
        const parsed = getFormatNumber(values.quantity ?? 0);
        if (parsed !== values.quantity) {
          form.setValue("quantity", parsed);
        }
      }

      if (name === "productName" && values.productName !== "") {
        const dataPrice = dataName.find((dn) => dn.Name === values.productName);
        form.setValue("price", dataPrice?.Price || 0);
        setDisplayPrice(formatRupiah(dataPrice?.Price || 0));
      }
    });

    return () => subscription.unsubscribe();
  }, [form, dataName]);

  useEffect(() => {
    if (!isFetching) {
      setDataName((prev) => {
        const newData = initialData?.Product || [];
        if (newData.length === 0) {
          setHasMore(false);
          return prev;
        }

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

  async function handleSubmit(v: CREATETRANSACTION) {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-4.5 text-sm">
          <PlusIcon /> {isMobile ? "Add" : "Add Transaction"}
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
                    <Label htmlFor="quantity">Quantity</Label>
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
                      placeholder="Rp10.000"
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
                    placeholder="Rp10.000.000"
                    disabled
                    className="pointer-events-none select-none"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit">Save</Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
