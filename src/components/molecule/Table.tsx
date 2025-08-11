import useTable from "@/hooks/useTable";
import TableContext from "@/store/table/TableContext";
import { flexRender, Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import { TableBody, TableCell, Table as TableComponentUI, TableHead, TableHeader, TableRow } from "../ui/table";

interface TableProps {
  children: ReactNode;
  table: Table<any>;
}

interface ContainerProps {
  children: ReactNode;
}

function TableComponent({children, table}: TableProps) {
  return (
    <TableContext table={table}>{children}</TableContext>
  )
}

function InputFilter() {
  const { table } = useTable();

  const column = table.getColumn("name");
  const value = column?.getFilterValue() as string | undefined;

  return (
    <input onChange={(e) => column?.setFilterValue(e.target.value)} value={value ?? ''} placeholder="Ex: Doces" type="text" className="p-2 rounded-xl border border-gray-300 w-full px-2 outline-none focus:outline-none text-gray-600"/>
  )
}

function Header() {
  const { table } = useTable();

  return (
    <TableHeader className="bg-[#CCCCCC33]/20">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className="px-4"
              style={{ width: `${header.getSize()}%` }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

function Container({ children }: ContainerProps) {
  return (
    <div className="w-full mt-4 rounded-xl border bg-white overflow-y-auto max-h-[600px]">
      <TableComponentUI>{children}</TableComponentUI>
    </div>
  );
}

function Body() {
  const { table } = useTable();

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id}>
          {row.getAllCells().map((cell) => (
            <TableCell
              key={cell.id}
              className="py-6 px-4"
              style={{ width: `${cell.column.getSize()}%` }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

TableComponent.Header = Header;
TableComponent.InputFilter = InputFilter;
TableComponent.Container = Container;
TableComponent.Body = Body;

export default TableComponent
