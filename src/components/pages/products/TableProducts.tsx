"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { getColumnsProduct } from "@/lib/columns-table";
import { useProducts } from "@/lib/product-queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useDataStore } from "@/store/data-store";

interface TableProductsProps {
  isPageProduct?: boolean;
  userId: string;
}

export default function TableProducts(props: TableProductsProps) {
  const { isPageProduct, userId } = props;
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: initialData, isLoading } = useProducts({
    userId: userId,
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
  });
  const setDataProduct = useDataStore((s) => s.setDataProduct);
  const dataProduct = useDataStore((s) => s.dataProduct);
  const isSearching = useDataStore((s) => s.isLoading);
  const setOriginalDataProduct = useDataStore((s) => s.setOriginalDataProduct);
  useEffect(() => {
    setDataProduct(initialData?.Product || []);
    setOriginalDataProduct(initialData?.Product || []);
  }, [initialData, setDataProduct, setOriginalDataProduct]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const tableProducts = useReactTable({
    data: dataProduct,
    columns: getColumnsProduct(!!isPageProduct),
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    manualPagination: true,
    rowCount: (initialData?.TotalPages ?? 0) * pagination.pageSize,
    getRowId: (row) => row.Id.toString(),
    enableRowSelection: true,
    onSortingChange: setSorting,
    enableSorting: true,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {tableProducts.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {isLoading || isSearching ? (
              Array.from({ length: pagination.pageSize }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({
                    length: getColumnsProduct(!!isPageProduct).length,
                  }).map((_, i) => (
                    <TableCell key={i} className="h-12 text-center">
                      <Skeleton className="w-full h-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : tableProducts.getRowModel().rows?.length ? (
              tableProducts.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original.Id}
                  className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={getColumnsProduct(!!isPageProduct).length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end px-4">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${tableProducts.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                tableProducts.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={tableProducts.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {tableProducts.getState().pagination.pageIndex + 1} of{" "}
            {initialData ? (
              initialData.TotalPages
            ) : (
              <Skeleton className="h-4 bg-muted-foreground/20 w-5 ms-2" />
            )}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => tableProducts.setPageIndex(0)}
              disabled={!tableProducts.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => tableProducts.previousPage()}
              disabled={pagination.pageIndex + 1 === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }))
              }
              disabled={pagination.pageIndex + 1 === initialData?.TotalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() =>
                tableProducts.setPageIndex(tableProducts.getPageCount() - 1)
              }
              disabled={!tableProducts.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
