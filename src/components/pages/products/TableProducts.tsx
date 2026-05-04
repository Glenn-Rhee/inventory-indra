"use client";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useId, useMemo, useState } from "react";
import z from "zod";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
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
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { DraggableRow } from "../../DraggabaleRow";
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
import { schema } from "@/model/schema-table";
import { useProducts } from "@/lib/product-queries";
import { Skeleton } from "@/components/ui/skeleton";

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

  const [data, setData] = useState<z.infer<typeof schema>[]>([]);

  useEffect(() => {
    if (initialData) {
      setData(initialData || []);
    }
  }, [initialData]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const tableProducts = useReactTable({
    data,
    columns: getColumnsProduct(!!isPageProduct),
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    getRowId: (row) => row.Id.toString(),
    enableRowSelection: true,
    onSortingChange: setSorting,
    enableSorting: true,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ Id }) => Id) || [],
    [data],
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }
  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
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
              {isLoading ? (
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
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {tableProducts.getRowModel().rows.map((row) => (
                    <DraggableRow
                      key={row.id}
                      getIsSelected={row.getIsSelected}
                      getVisibleCells={row.getVisibleCells}
                      id={row.original.Id}
                    />
                  ))}
                </SortableContext>
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
        </DndContext>
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
            {tableProducts.getPageCount()}
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
              disabled={!tableProducts.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => tableProducts.nextPage()}
              disabled={!tableProducts.getCanNextPage()}
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
