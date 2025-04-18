import { formatCurrency } from "@/utils/formatCurrency";
import { Cell, ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import TableComponent from "../Table/Table";
import { Order, orders } from "./mockData";
import HistoryModalSkeleton from "./modals/HistoryModalSkeleton";

const HistoryModal = lazy(() => import("./modals/HistoryModal"));

function HistoryTable() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSelectedOrder = useCallback(
    (order: Order | null) => setSelectedOrder(order),
    []
  );

  const columns = useMemo(
    (): ColumnDef<Order>[] => [
      {
        accessorKey: "table",
        header: () => <p className="text-[#333333] font-semibold">Mesa</p>,
        size: 6,
      },
      {
        accessorKey: "date",
        header: () => (
          <div className="flex gap-2 items-center text-[#333333] font-semibold">
            <p>Data</p>
          </div>
        ),
        size: 10,
      },
      {
        accessorKey: "name",
        header: () => <p className="text-[#333333] font-semibold">Nome</p>,
        size: 40,
      },
      {
        accessorKey: "category",
        header: () => <p className="text-[#333333] font-semibold">Categoria</p>,
        size: 20,
      },
      {
        accessorKey: "total",
        header: () => <p className="text-[#333333] font-semibold">Total</p>,
        cell: ({ cell }: { cell: Cell<any, any> }) => (
          <p>{formatCurrency(Number(cell.getValue() ?? 0))}</p>
        ),
        size: 16,
      },
      {
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableHiding: false,
        enableGrouping: false,
        enableSorting: false,
        enableResizing: false,
        enableMultiSort: false,
        id: "actions",
        header: () => <p className="text-[#333333] font-semibold">Ações</p>,
        cell: ({ row }) => {
          return (
            <div className="flex gap-4">
              <button
                onClick={() => handleSelectedOrder(row.original)}
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
      {!!selectedOrder && <Suspense fallback={<HistoryModalSkeleton isVisible={!!selectedOrder} />}>
        <HistoryModal
          order={selectedOrder}
          isLoading={false}
          isVisible={!!selectedOrder}
          onClose={() => handleSelectedOrder(null)}
          onDelete={() => Promise.resolve()}
        />
      </Suspense>}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text=[#333333]">Pedidos</h2>
        <span className="bg-[#CCCCCC33] ml-4 px-2 py-1 rounded-md font-semibold">
          3
        </span>
      </div>
      <TableComponent data={orders} columns={columns} />
    </>
  );
}

export default HistoryTable;
