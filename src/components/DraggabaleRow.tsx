import { Cell, flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { TableCell, TableRow } from "./ui/table";
import { CSS } from "@dnd-kit/utilities";

export function DraggableRow<T>({
  getIsSelected,
  getVisibleCells,
  id,
}: {
  id: number;
  getIsSelected: () => boolean;
  getVisibleCells: () => Cell<T, unknown>[];
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id,
  });

  return (
    <TableRow
      data-state={getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
