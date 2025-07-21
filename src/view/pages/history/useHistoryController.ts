import { useAuth } from "@/hooks/useAuth";
import { HistoryService } from "@/services/api/history";
import { HistoryOrder } from "@/types/Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useHistoryController = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<HistoryOrder | null>(null);
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

  const { data: historyOrders, isFetching: isGettingHistoryOrders } = useQuery({
    queryKey: ["history_orders", { orgId: user.orgId, page }],
    queryFn: async () => {
      return await HistoryService.getHistoryOrders({ page, orgId: user.orgId });
    },
  });

  const handleSelectedOrder = useCallback(
    (order: HistoryOrder | null) => setSelectedOrder(order),
    []
  );


  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrderMutate(id);
      queryClient.invalidateQueries({queryKey: ["history_orders", { orgId: user.orgId, page }]});
    } catch (error) {
      toast.error('Erro ao deletar o pedido');
      console.log('Erro ao deletar o pedido', error);
    }
  };
  console.log('HistoryOrders', historyOrders);
  return {
    data: historyOrders && historyOrders,
    setCurrentPage,
    handleSelectedOrder,
    isGettingHistoryOrders,
    isDeleting,
    onDeleteOrder: (id: string) => handleDeleteOrder(id),
    page,
    selectedOrder,
  };
};
