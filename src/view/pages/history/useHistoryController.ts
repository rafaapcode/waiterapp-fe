import { useAuth } from "@/hooks/useAuth";
import { HistoryService } from "@/services/api/history";
import { HistoryOrder } from "@/types/Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "react-toastify";

export const useHistoryController = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<HistoryOrder | null>(null);
  const [filterDateSelected, setFilterDateSelected] = useState<
    DateRange | undefined
  >(undefined);
  const [page, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (page > 0) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ["history_orders", { orgId: user.orgId, page: nextPage }],
        queryFn: async () => {
          return await HistoryService.getHistoryOrders({ page: nextPage, orgId: user.orgId });
        },
      });
    }
  }, [page]);

  const { mutateAsync: deleteOrderMutate, isPending: isDeleting } = useMutation({
    mutationFn: async (orderid: string) => {
      await HistoryService.deleteOrder({ orderid, orgId: user.orgId });
    },
  });

  const { data: historyOrders, isPending: isGettingHistoryOrders } = useQuery({
    queryKey: ["history_orders", { orgId: user.orgId, page }],
    queryFn: async () => {
      return await HistoryService.getHistoryOrders({ page, orgId: user.orgId });
    },
  });

  const {
    data: historyFilteredOrders,
    isPending: isGettingHistoryFilteredOrders,
  } = useQuery({
    queryKey: [
      "history",
      "order",
      "filter",
      {
        orgid: user.orgId,
        filters: { from: filterDateSelected?.from, to: filterDateSelected?.to },
      },
    ],
    queryFn: async () => {
      return await HistoryService.getFilteredHistoryOrders({
        filteredDateSelected: filterDateSelected,
        page,
        orgId: user.orgId,
      });
    },
  });

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

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrderMutate(id);
    } catch (error) {
      toast.error('Erro ao deletar o pedido');
      console.log('Erro ao deletar o pedido', error);
    }
  };

  return {
    data: !filterDateSelected ? historyOrders : historyFilteredOrders,
    filterDateSelected,
    setCurrentPage,
    handleResetData,
    handleSelectedDate,
    handleSelectedOrder,
    isGettingHistoryOrders,
    isGettingHistoryFilteredOrders,
    isDeleting,
    onDeleteOrder: (id: string) => handleDeleteOrder(id),
    page,
    selectedOrder,
  };
};
