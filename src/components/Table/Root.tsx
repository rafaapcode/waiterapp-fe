import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Table as TableUI } from "../ui/table";
import TableContext from "./TableContext";

interface RootProps {
  children: ReactNode;
  table: Table<any>;
}

function Root({ children, table }: RootProps) {
  return (
    <div className="w-full mt-4 rounded-xl border bg-white overflow-y-auto max-h-full">
      <TableUI>
        <TableContext table={table}>{children}</TableContext>
      </TableUI>
    </div>
  );
}

export default Root;
