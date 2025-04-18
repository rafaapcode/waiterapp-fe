import useTable from "@/hooks/useTable";
import { flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";

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

export default Header;
