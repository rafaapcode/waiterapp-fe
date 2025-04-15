import { formatCurrency } from "@/utils/formatCurrency";
import { Cell } from "@tanstack/react-table";
import { Eye, Funnel, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import HistoryModal from "../HistoryModal/HistoryModal";
import TableComponent from "../Table/Table";
import { orders } from "./mockData";

function HistoryTable() {
  const [selectedHistory, setSelectedHistory] = useState<string>("");

  const handleSelectedHistory = useCallback(
    (id: string) => setSelectedHistory(id),
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "table",
        header: () => <p className="text-[#333333] font-semibold">Mesa</p>,
      },
      {
        accessorKey: "date",
        header: () => (
          <div className="flex gap-2 items-center text-[#333333] font-semibold">
            <p>Data</p>
            <Funnel size={14} />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: () => <p className="text-[#333333] font-semibold">Nome</p>,
      },
      {
        accessorKey: "category",
        header: () => <p className="text-[#333333] font-semibold">Categoria</p>,
      },
      {
        accessorKey: "total",
        header: () => <p className="text-[#333333] font-semibold">Total</p>,
        cell: ({ cell }: { cell: Cell<any, any> }) => (
          <p>{formatCurrency(Number(cell.getValue() ?? 0))}</p>
        ),
      },
      {
        id: "actions",
        header: () => <p className="text-[#333333] font-semibold">Ações</p>,
        cell: () => {
          return (
            <div className="flex gap-4">
              <button
                onClick={() => handleSelectedHistory("123")}
                className="text-[#666666] hover:text-[#9e9e9e] transition-all duration-200"
              >
                <Eye size={20} />
              </button>
              <button className="text-red-600 hover:text-red-800 transition-all duration-200">
                <Trash size={20} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <HistoryModal
        isLoading={false}
        isVisible={ !!selectedHistory }
        onClose={() => handleSelectedHistory("")}
        onDelete={() => Promise.resolve()}
      />
      <TableComponent data={orders} columns={columns} />
    </>
  );
}

export default HistoryTable;
