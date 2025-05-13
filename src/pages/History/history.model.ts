import { HistoryOrder } from "@/types/Order";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  return {
    props: {
      data: filteredData,
      filterDateSelected,
      handlePage,
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
