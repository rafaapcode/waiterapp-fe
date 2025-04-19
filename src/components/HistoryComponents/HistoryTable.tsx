import createTable from "@/hooks/createTable";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { Cell, ColumnDef, getFilteredRowModel, TableOptions } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";
import Table from "../Table";
import DropdownDateFilter from "./DropdownFilter";
import { Order, orders } from "./mockData";
import HistoryModalSkeleton from "./modals/HistoryModalSkeleton";

const HistoryModal = lazy(() => import("./modals/HistoryModal"));

function HistoryTable() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterDateSelected, setFilterDateSelected] = useState<
    DateRange | undefined
  >(undefined);
  const [data] = useState<Order[]>(orders);
  const [filteredDate, setFilteredData] = useState<Order[]>(orders);

  const handleSelectedDate = useCallback(
    (date: DateRange | undefined) => setFilterDateSelected(date),
    []
  );
  const handleSelectedOrder = useCallback(
    (order: Order | null) => setSelectedOrder(order),
    []
  );

  useEffect(() => {
    if(filterDateSelected?.to && filterDateSelected.from) {
      const formatToDate = formatDate(filterDateSelected.to);
      const formatFromDate = formatDate(filterDateSelected.from);

      const newOrders = data.filter(order => order.date >= formatFromDate && order.date <= formatToDate);

      setFilteredData(newOrders);
    }
  }, [filterDateSelected]);

  const columns = useMemo(
    (): ColumnDef<Order>[] => [
      {
        id: "table",
        accessorKey: "table",
        header: () => <p className="text-[#333333] font-semibold">Mesa</p>,
        size: 6,
      },
      {
        id: "date",
        accessorKey: "date",
        header: () => (
          <div className="flex gap-2 items-center text-[#333333] font-semibold">
            <p>Data</p>
          </div>
        ),
        size: 10,
      },
      {
        id: "name",
        accessorKey: "name",
        header: () => <p className="text-[#333333] font-semibold">Nome</p>,
        size: 40,
      },
      {
        id: "category",
        accessorKey: "category",
        header: () => <p className="text-[#333333] font-semibold">Categoria</p>,
        size: 20,
      },
      {
        id: "total",
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

  const optionsTable: Omit<TableOptions<Order>, "columns" | "data" | "getCoreRowModel"> = {
    manualFiltering: true,
    getFilteredRowModel: getFilteredRowModel()
  };

  const table = createTable(filteredDate, columns, optionsTable);

  return (
    <>
      {!!selectedOrder && (
        <Suspense
          fallback={<HistoryModalSkeleton isVisible={!!selectedOrder} />}
        >
          <HistoryModal
            order={selectedOrder}
            isLoading={false}
            isVisible={!!selectedOrder}
            onClose={() => handleSelectedOrder(null)}
            onDelete={() => Promise.resolve()}
          />
        </Suspense>
      )}
      <div className="flex items-center gap-2 justify-between">
        <div className="flex">
          <h2 className="text-lg font-semibold text=[#333333]">Pedidos</h2>
          <span className="bg-[#CCCCCC33] ml-4 px-2 py-1 rounded-md font-semibold">
            {orders.length ?? 0}
          </span>
        </div>
      </div>

      <Table.Root table={table}>
        <DropdownDateFilter
          date={filterDateSelected}
          onSelectDates={handleSelectedDate}
        />
        <Table.Container>
          <Table.Header />
          <Table.Body />
        </Table.Container>
      </Table.Root>
    </>
  );
}

export default HistoryTable;
