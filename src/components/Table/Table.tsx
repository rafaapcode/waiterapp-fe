import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
} from "@tanstack/react-table";
import { Table as TableConfig } from "@tanstack/table-core";

interface TableComponentProps<TData> {
  tableconfig: TableConfig<TData>
  custom?: boolean;
}

function TableComponent<TData>({ tableconfig,  custom = false}: TableComponentProps<TData>) {
  return (
    <div className="w-full mt-4 rounded-xl border bg-white overflow-y-auto max-h-full">
    <Table>
      <TableHeader className="bg-[#CCCCCC33]/20">
        {tableconfig.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="px-4">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {tableconfig.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell key={cell.id} className={`py-6 px-4 ${custom && (cell.id.includes("emoji") && "w-[5%]")} ${cell.id.includes("actions") && "w-[8%]"}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}

export default TableComponent
