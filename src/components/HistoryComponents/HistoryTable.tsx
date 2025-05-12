import createTable from "@/hooks/createTable";
import { HistoryOrder } from "@/types/Order";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Cell,
  ColumnDef,
  getFilteredRowModel,
  TableOptions,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { Eye, Trash } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";
import { toast } from "react-toastify";
import Pagination from "../pagination/Pagination";
import Table from "../Table";
import DropdownDateFilter from "./DropdownFilter";
import HistoryModalSkeleton from "./modals/HistoryModalSkeleton";

const HistoryModal = lazy(() => import("./modals/HistoryModal"));

function HistoryTable() {
  const queryClient = useQueryClient();

  const [selectedOrder, setSelectedOrder] = useState<HistoryOrder | null>(null);
  const [filterDateSelected, setFilterDateSelected] = useState<
    DateRange | undefined
  >(undefined);
  const [filteredData, setFilteredData] = useState<{
    total_pages: number;
    history: HistoryOrder[];
  }>({ total_pages: 0, history: [] });
  const [page, setCurrentPage] = useState<number>(1);

  const { mutateAsync: deleteOrder, isPending } = useMutation({
    mutationFn: async (id: string) =>
      await apiclient.delete(`/order/history/${id}`),
    onSuccess: () => {
      toast.success("Registro deletado com Sucesso !");
      queryClient.invalidateQueries({ queryKey: ["history_orders"] });
      setSelectedOrder(null);
    },
    onError: (error) => {
      const err = error as AxiosError;
      if (err.status === 404) {
        toast.warning("Id não encontrado !");
      } else {
        toast.error("Erro ao encontrar o ID do registro");
      }
      return;
    },
  });

  useQuery({
    queryKey: ["history_orders", { page }],
    queryFn: async (): Promise<{
      total_pages: number;
      history: HistoryOrder[];
    }> => {
      try {
        const { data: historyOrders } = await apiclient.get(
          `/order/history/${page}`
        );
        setFilteredData(historyOrders);
        return historyOrders;
      } catch (error) {
        console.log(error);
        setFilteredData({ total_pages: 0, history: [] });
        toast.error("Nenhum pedido encontrado !");
        return { total_pages: 0, history: [] };
      }
    },
  });

  const { isFetching } = useQuery({
    enabled: !!(filterDateSelected?.to && filterDateSelected.from),
    queryKey: ["history_orders", { page }, filterDateSelected],
    queryFn: async (): Promise<{
      total_pages: number;
      history: HistoryOrder[];
    }> => {
      try {
        const { data: historyOrdersFiltered } = await apiclient.get(
          `/order/history/filter/${page}`,
          {
            params: {
              to: filterDateSelected?.to,
              from: filterDateSelected?.from,
            },
          }
        );
        setFilteredData(historyOrdersFiltered);

        return historyOrdersFiltered;
      } catch (error) {
        setFilteredData({ total_pages: 0, history: [] });
        return { total_pages: 0, history: [] };
      }
    },
  });

  const handlePage = (type: "Next" | "Previous" | "First" | "Last") => {
    switch (type) {
      case "First":
        setCurrentPage(1);
        break;
      case "Previous":
        setCurrentPage((prev) => (prev >= 0 && prev > 1 ? prev - 1 : 1));
        break;
      case "Next":
        setCurrentPage((prev) => prev + 1);
        break;
      case "Last":
        setCurrentPage(filteredData.total_pages);
        break;
      default:
        setCurrentPage(1);
        break;
    }
  };

  const handleSelectedDate = useCallback(
    (date: DateRange | undefined) => setFilterDateSelected(date),
    []
  );

  const handleSelectedOrder = useCallback(
    (order: HistoryOrder | null) => setSelectedOrder(order),
    []
  );

  const handleResetData = () => {
    queryClient.invalidateQueries({ queryKey: ["history_orders", { page }] });
    setFilterDateSelected(undefined);
  };

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
                onClick={() => deleteOrder(row.original.id)}
                className="text-red-600 hover:text-red-800 transition-all duration-200"
              >
                <Trash size={20} />
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

  const table = createTable(filteredData.history, columns, optionsTable);
  return (
    <>
      {!!selectedOrder && (
        <Suspense
          fallback={<HistoryModalSkeleton isVisible={!!selectedOrder} />}
        >
          <HistoryModal
            isLoading={isPending}
            order={selectedOrder}
            isVisible={!!selectedOrder}
            onClose={() => handleSelectedOrder(null)}
            onDelete={(id: string) => deleteOrder(id)}
          />
        </Suspense>
      )}
      <div className="flex items-center gap-2 justify-between">
        <div className="flex">
          <h2 className="text-lg font-semibold text=[#333333]">Pedidos</h2>
          <span className="bg-[#CCCCCC33] ml-4 px-2 py-1 rounded-md font-semibold">
            {filteredData.history.length ?? 0}
          </span>
        </div>
      </div>

      <Table.Root table={table}>
        <div className="flex justify-end items-center gap-14">
          {isFetching && (
            <p className="text-zinc-400 animate-pulse">Atualizando dados...</p>
          )}
          <DropdownDateFilter
            handleResetData={handleResetData}
            date={filterDateSelected}
            onSelectDates={handleSelectedDate}
          />
        </div>
        {filteredData.history.length === 0 && (
          <div className="w-full mt-4 rounded-md border bg-white overflow-y-auto max-h-full text-center text-2xl py-10">
            <p>Nenhum pedido encontrado !</p>
          </div>
        )}
        {filteredData.history.length > 0 && (
          <Table.Container>
            <Table.Header />
            <Table.Body />
          </Table.Container>
        )}
        <Pagination
          existsOrder={filteredData.history.length !== 0}
          totalPage={filteredData.total_pages}
          page={page}
          handlePage={handlePage}
        />
      </Table.Root>
    </>
  );
}

export default HistoryTable;
