import { TableCtx } from "@/components/Table/TableContext";
import { useContext } from "react";

const useTable = () => {
  const ctx = useContext(TableCtx);

  if (!ctx) {
    throw new Error('Table deveria ser usado somente dentro de um contexto de tabela.')
  }

  return ctx;
}

export default useTable;
