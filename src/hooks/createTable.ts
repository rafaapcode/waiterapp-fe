import { ColumnDef, getCoreRowModel, TableOptions, useReactTable } from "@tanstack/react-table";

function createTable<TData>(data: TData[], columns: ColumnDef<TData>[], options?: TableOptions<TData>) {
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 5,
    },
    getCoreRowModel: getCoreRowModel(),
    ...options
  });

  return table
}

export default createTable;
