import { Table } from "@tanstack/react-table";
import { createContext, ReactNode } from "react";

interface ITableContextValue {
  table: Table<any>;
}

interface TableContextProps {
  children: ReactNode;
  table: Table<any>;
}

export const TableCtx = createContext<ITableContextValue>(
  {} as ITableContextValue
);

function TableContext({ children, table }: TableContextProps) {
  return <TableCtx.Provider value={{ table }}>{children}</TableCtx.Provider>;
}

export default TableContext;
