import TableComponent from "@/components/molecule/Table";
import createTable from "@/hooks/createTable";
import { HistoryOrder } from "@/types/Order";
import {
  Cell,
  ColumnDef,
  getFilteredRowModel,
  TableOptions,
} from "@tanstack/react-table";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { Dispatch, lazy, SetStateAction, Suspense, useMemo } from "react";
import Pagination from "../../components/molecule/Pagination";
import HistoryModalSkeleton from "../pages/history/modals/HistoryModalSkeleton";

const HistoryModal = lazy(() => import("../pages/history/modals/HistoryModal"));

interface HistoryTableProps {
  selectedOrder: HistoryOrder | null;
  isGettingHistoryOrders: boolean;
  isDeleting: boolean;
  handleSelectedOrder: (order: HistoryOrder | null) => void;
  onDeleteOrder: (id: string) => Promise<void>;
  data?: { total_pages: number; history: HistoryOrder[] };
  setCurrentPage: Dispatch<SetStateAction<number>>;
  page: number;
}

function HistoryTable(props: HistoryTableProps) {
  const {
    data,
    selectedOrder,
    setCurrentPage,
    handleSelectedOrder,
    page,
    onDeleteOrder,
    isDeleting,
    isGettingHistoryOrders
  } = props;

  const columns = useMemo(
    (): ColumnDef<HistoryOrder>[] => [
      {
        id: "table",
        accessorKey: "table",
        header: () => <p className="text-[#333333] font-semibold">Mesa</p>,
        size: 6,
      },
      {
        id: "date",
        accessorKey: "data",
        header: () => (
          <div className="flex gap-2 items-center text-[#333333] font-semibold">
            <p>Data</p>
          </div>
        ),
        cell: ({ cell }: { cell: Cell<any, any> }) => (
          <p>
            {Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
              new Date(cell.getValue())
            )}
          </p>
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
        accessorKey: "totalPrice",
        header: () => <p className="text-[#333333] font-semibold">Total</p>,
        cell: ({ cell }: { cell: Cell<any, any> }) => (
          <p>{cell.getValue() ?? "R$ 0,00"}</p>
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
              <button
                onClick={() => onDeleteOrder(row.original.id)}
                className="text-red-600 hover:text-red-800 transition-all duration-200"
              >
                {isDeleting && <LoaderCircle size={22} className="text-red-500"/>}
                {!isDeleting && <Trash size={20} />}
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const optionsTable: Omit<
    TableOptions<HistoryOrder>,
    "columns" | "data" | "getCoreRowModel"
  > = {
    manualFiltering: true,
    getFilteredRowModel: getFilteredRowModel(),
  };

  const table = createTable(data?.history ?? [], columns, optionsTable);
  return (
    <>
      {!!selectedOrder && (
        <Suspense
          fallback={<HistoryModalSkeleton isVisible={!!selectedOrder} />}
        >
          <HistoryModal
            isLoading={isDeleting}
            order={selectedOrder}
            isVisible={!!selectedOrder}
            onClose={() => handleSelectedOrder(null)}
            onDelete={(id: string) => onDeleteOrder(id)}
          />
        </Suspense>
      )}
      <div className="flex items-center gap-2 justify-between">
        <div className="flex">
          <h2 className="text-lg font-semibold text=[#333333]">Pedidos</h2>
          <span className="bg-[#CCCCCC33] ml-4 px-2 py-1 rounded-md font-semibold">
            {data?.history.length ?? 0}
          </span>
        </div>
      </div>

      <TableComponent table={table}>
        {
          isGettingHistoryOrders && (
            <div className="w-full bg-gray-200 animate-pulse h-24 rounded-lg" />
          )
        }
        {((!data || data.history.length === 0) && !isGettingHistoryOrders) && (
          <div className="w-full mt-4 rounded-md border bg-white overflow-y-auto max-h-full text-center text-2xl py-10">
            <p>Nenhum pedido encontrado !</p>
          </div>
        )}
        {(data && data.history.length > 0 && !isGettingHistoryOrders) && (
          <TableComponent.Container>
            <TableComponent.Header />
            <TableComponent.Body />
          </TableComponent.Container>
        )}
        <Pagination
          existsOrder={(data && data.history.length === 0) ?? false}
          totalPage={data?.total_pages ?? 0}
          page={page}
          setCurrentPage={setCurrentPage}
        />
      </TableComponent>
    </>
  );
}

export default HistoryTable;
