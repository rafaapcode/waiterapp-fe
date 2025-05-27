import { HistoryService } from "@/services/api/history";
import { HistoryOrder } from "@/types/Order";
import { apiclient } from "@/utils/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "react-toastify";
import { HistoryModelType } from "./history.type";

export const useHistoryModel = (): HistoryModelType => {
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

  useEffect(() => {
    if (page < filteredData.total_pages && page > 0) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ["history_orders", { page: nextPage }],
        queryFn: async (): Promise<{
          total_pages: number;
          history: HistoryOrder[];
        }> => {
          try {
            const { data: historyOrders } = await apiclient.get(
              `/order/history/${nextPage}`
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
    }
  }, [page]);

  const { deleteOrder, isPending } = HistoryService.deleteOrder(
    () => {
      toast.success("Registro deletado com Sucesso !");
      queryClient.invalidateQueries({ queryKey: ["history_orders"] });
      setSelectedOrder(null);
    },
    (error) => {
      console.log(error);
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message);
      return;
    }
  );

  HistoryService.getHistoryOrders(page, (data) => {
    setFilteredData(data);
  })

  const { isFetching } = HistoryService.getFilteredHistoryOrders(page, filterDateSelected, (data) => {
    setFilteredData(data);
  })

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

  return {
    props: {
      data: filteredData,
      filterDateSelected,
      setCurrentPage,
      handleResetData,
      handleSelectedDate,
      handleSelectedOrder,
      isFetching,
      isPending,
      onDeleteOrder: (id: string) => deleteOrder(id),
      page,
      selectedOrder,
    },
  };
};
