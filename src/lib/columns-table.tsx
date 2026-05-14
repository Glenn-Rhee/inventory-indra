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
import { getFormatDate } from "@/helper/getFormatDate";

export function getColumnsProduct(
  isPageProduct: boolean,
): ColumnDef<z.infer<typeof schema>>[] {
  let columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
      id: "no",
      header: "No",
      cell: ({ row, table }) => {
        const { pageIndex, pageSize } = table.getState().pagination;
        return <span>{pageIndex * pageSize + row.index + 1}</span>;
      },
    },
    {
      accessorKey: "Name",
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
      accessorKey: "Category",
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
            {row.original.Category}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "Price",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price (butir/item)
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
        <div>Rp{row.original.Price.toLocaleString("id-ID")}</div>
      ),
    },
    {
      accessorKey: "StatusExpired",
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
            row.original.StatusExpired === "EXPIRED"
              ? "destructive"
              : row.original.StatusExpired === "WARNING"
                ? "warning"
                : "secondary"
          }
          className={cn("px-1.5 text-white", "")}
        >
          {row.original.StatusExpired}
        </Badge>
      ),
    },
    {
      accessorKey: "ExpiredDate",
      header: "Expired Date",
      cell: ({ row }) => {
        return <span>{getFormatDate(row.original.ExpiredDate)}</span>;
      },
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
                <DialogDelete
                  productId={row.original.Id}
                  productName={row.original.Name}
                />
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
    id: "no",
    header: "No",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return <span>{pageIndex * pageSize + row.index + 1}</span>;
    },
  },
  {
    accessorKey: "Id",
    header: "Transaction Id",
    cell: ({ row }) => <div className="text-left">{row.original.Id}</div>,
  },
  {
    accessorKey: "ProductName",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="text-left">{row.original.ProductName}</div>
    ),
  },
  {
    accessorKey: "TransactionType",
    header: "Transaction Type",
    cell: ({ row }) => (
      <div className="w-32 flex items-center justify-center">
        <Badge
          variant={
            row.original.TransactionType === "IN" ? "secondary" : "destructive"
          }
          className={"px-1.5 text-white w-10"}
        >
          {row.original.TransactionType}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "Quantity",
    header: "Quantity",
    cell: ({ row }) => <div className="text-left">{row.original.Quantity}</div>,
  },
  {
    accessorKey: "Price",
    header: "Price",
    cell: ({ row }) => (
      <div className="text-left">
        Rp{row.original.Price.toLocaleString("id-ID")}
      </div>
    ),
  },
  {
    accessorKey: "TotalPrice",
    header: "Total Price",
    cell: ({ row }) => (
      <div className="text-left">
        Rp{row.original.TotalPrice.toLocaleString("id-ID")}
      </div>
    ),
  },
  {
    accessorKey: "TransactionDate",
    header: "Transaction Date",
    cell: ({ row }) => (
      <div className="text-left">
        {getFormatDate(row.original.TransactionDate)}
      </div>
    ),
  },
] as ColumnDef<z.infer<typeof schemaTransactions>>[];

export const columnsStock: ColumnDef<z.infer<typeof schemaStocks>>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return <span>{pageIndex * pageSize + row.index + 1}</span>;
    },
  },
  {
    accessorKey: "Name",
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
    cell: ({ row }) => <div className="text-left">{row.original.Name}</div>,
  },
  {
    accessorKey: "StatusStock",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status Stock
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
          row.original.StatusStock === "SOLD-OUT"
            ? "destructive"
            : row.original.StatusStock === "LOW-STOCK"
              ? "warning"
              : "secondary"
        }
        className={cn("px-1.5 text-white", "")}
      >
        {row.original.StatusStock}
      </Badge>
    ),
  },
  {
    accessorKey: "Stock",
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
    cell: ({ row }) => <div className="text-left">{row.original.Stock}</div>,
  },
  {
    accessorKey: "StatusExpired",
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
          row.original.StatusExpired === "EXPIRED"
            ? "destructive"
            : row.original.StatusExpired === "WARNING"
              ? "warning"
              : "secondary"
        }
        className={cn("px-1.5 text-white", "")}
      >
        {row.original.StatusExpired}
      </Badge>
    ),
  },
  {
    accessorKey: "ExpiredDate",
    header: "Expired Date",
    cell: ({ row }) => (
      <div className="text-left">{getFormatDate(row.original.ExpiredDate)}</div>
    ),
  },
  {
    accessorKey: "LastUpdate",
    header: "Last Updated",
    cell: ({ row }) => (
      <div className="text-left">{getFormatDate(row.original.LastUpdate)}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button onClick={() => console.log(row.original.Id)} className="text-sm">
        <PlusIcon className="size-3" /> Restock
      </Button>
    ),
  },
];
