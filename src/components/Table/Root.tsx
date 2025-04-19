import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import TableContext from "./TableContext";

interface RootProps {
  children: ReactNode;
  table: Table<any>;
}

function Root({ children, table }: RootProps) {
  return <TableContext table={table}>{children}</TableContext>;
}

export default Root;
