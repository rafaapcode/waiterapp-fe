import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Funnel } from "lucide-react";
import { orders } from "./mockData";

function HistoryTable() {
  const table = useReactTable({
    data: orders,
    columns: [
      { accessorKey: "table", header: () => <p className="text-[#333333] font-semibold">Mesa</p> },
      { accessorKey: "date", header: () => <div className="flex gap-2 items-center text-[#333333] font-semibold">
        <p>Data</p>
        <Funnel size={14}/>
      </div> },
      { accessorKey: "name", header: () => <p className="text-[#333333] font-semibold">Nome</p> },
      { accessorKey: "category", header: () => <p className="text-[#333333] font-semibold">Categoria</p> },
      { accessorKey: "total", header: () => <p className="text-[#333333] font-semibold">Total</p> },
      {accessorKey: 'id', header: () => <p className="text-[#333333] font-semibold">Ações</p>}
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full mt-4 rounded-xl border bg-white overflow-y-auto max-h-full">
      <Table>
        <TableHeader className="bg-[#CCCCCC33]/20">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {
                headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="px-4">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))
              }
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {
                row.getAllCells().map(cell => (
                  <TableCell key={cell.id} className="py-6 px-4">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable;
