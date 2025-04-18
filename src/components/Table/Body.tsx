import useTable from "@/hooks/useTable";
import { flexRender } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui/table";

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

export default Body;
