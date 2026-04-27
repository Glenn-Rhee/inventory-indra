import { DragHandle } from "@/components/drag-handle";
import TableCellViewer from "@/components/TableCellViewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  EllipsisVerticalIcon,
  PlusIcon,
} from "lucide-react";
import z from "zod";
import { cn } from "./utils";
import DialogEditProduct from "@/components/pages/products/DialogEditProduct";
import DialogDelete from "@/components/DialogDelete";
import { schema, schemaStocks, schemaTransactions } from "@/model/schema-table";

export function getColumnsProduct(
  isPageProduct: boolean,
): ColumnDef<z.infer<typeof schema>>[] {
  let columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="w-2 h-2" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />;
      },
      enableHiding: false,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="w-2 h-2" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => (
        <div className="w-32">
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            {row.original.category}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="w-2 h-2" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => (
        <div>Rp{row.original.price.toLocaleString("id-ID")}</div>
      ),
    },
    {
      accessorKey: "expired_status",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status Expired
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="w-2 h-2" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.expired_status === "EXPIRED"
              ? "destructive"
              : row.original.expired_status === "WARNING"
                ? "warning"
                : "secondary"
          }
          className={cn("px-1.5 text-white", "")}
        >
          {row.original.expired_status}
        </Badge>
      ),
    },
    {
      accessorKey: "expiredDate",
      header: "Expired Date",
      cell: ({ row }) => row.original.expired_date,
    },
  ];

  if (isPageProduct) {
    columns = [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="icon"
              >
                <EllipsisVerticalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={(e) => e.preventDefault()}
                className="focus:text-white hover:text-white active:bg-primary active:text-white"
              >
                <DialogEditProduct product={row.original} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => e.preventDefault()}
                variant="destructive"
              >
                <DialogDelete />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }

  return columns;
}

export const columnsTransaction: ColumnDef<
  z.infer<typeof schemaTransactions>
>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.product_id} />,
  },
  {
    accessorKey: "product_id",
    header: "Product ID",
    cell: ({ row }) => <div className="text-left">{row.original.quantity}</div>,
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="text-left">{row.original.product_name}</div>
    ),
  },
  {
    accessorKey: "transaction_type",
    header: "Transaction Type",
    cell: ({ row }) => (
      <div className="w-32 flex items-center justify-center">
        <Badge
          variant={
            row.original.transaction_type === "IN" ? "secondary" : "destructive"
          }
          className={"px-1.5 text-white w-10"}
        >
          {row.original.transaction_type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div className="text-left">{row.original.quantity}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="text-left">
        Rp{row.original.price.toLocaleString("id-ID")}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total Price",
    cell: ({ row }) => (
      <div className="text-left">
        Rp{row.original.total.toLocaleString("id-ID")}
      </div>
    ),
  },
  {
    accessorKey: "transaction_date",
    header: "Transaction Date",
    cell: ({ row }) => (
      <div className="text-left">{row.original.transaction_date}</div>
    ),
  },
] as ColumnDef<z.infer<typeof schemaTransactions>>[];

export const columnsStock: ColumnDef<z.infer<typeof schemaStocks>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="w-2 h-2" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <div className="text-left">{row.original.product_name}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="w-2 h-2" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <div className="text-left">{row.original.stock}</div>,
  },
  {
    accessorKey: "expired_status",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Expired Status
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="w-2 h-2" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.expired_status === "EXPIRED"
            ? "destructive"
            : row.original.expired_status === "WARNING"
              ? "warning"
              : "secondary"
        }
        className={cn("px-1.5 text-white", "")}
      >
        {row.original.expired_status}
      </Badge>
    ),
  },
  {
    accessorKey: "expired_date",
    header: "Expired Date",
    cell: ({ row }) => (
      <div className="text-left">{row.original.expired_date}</div>
    ),
  },
  {
    accessorKey: "last_updated",
    header: "Last Updated",
    cell: ({ row }) => (
      <div className="text-left">{row.original.last_updated}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button onClick={() => console.log(row.original.id)} className="text-sm">
        <PlusIcon className="size-3" /> Restock
      </Button>
    ),
  },
];
