import { schema, schemaTransactions } from "@/components/data-table";
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
  CircleCheckIcon,
  EllipsisVerticalIcon,
  LoaderIcon,
} from "lucide-react";
import z from "zod";

export const columnsProduct: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <div>{row.original.limit}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: () => "Rp100.000",
  },
  {
    accessorKey: "statusExp",
    header: "Status Expired",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.status === "Done" ? (
          <CircleCheckIcon className="fill-green-500 dark:fill-green-400" />
        ) : (
          <LoaderIcon />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "expiredDate",
    header: "Expired Date",
    cell: ({ row }) => row.original.reviewer,
  },
  {
    id: "actions",
    cell: () => (
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

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
    cell: ({ row }) => (
      <div className="text-right">{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: "transaction_type",
    header: "Transaction Type",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge
          variant={
            row.original.transaction_type === "IN" ? "secondary" : "destructive"
          }
          className="px-1.5 text-muted-foreground"
        >
          {row.original.transaction_type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="text-right">{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="text-right">
        Rp{row.original.price.toLocaleString("id-ID")}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total Price",
    cell: ({ row }) => (
      <div className="text-right">
        Rp{row.original.total.toLocaleString("id-ID")}
      </div>
    ),
  },
  {
    accessorKey: "transaction_date",
    header: "Transaction Date",
    cell: ({ row }) => (
      <div className="text-right">Rp{row.original.transaction_date}</div>
    ),
  },
] as ColumnDef<z.infer<typeof schemaTransactions>>[];
