import { useAuth } from "@/hooks/useAuth";
import { OrderService } from "@/services/api/order";
import { OrderStatus } from "@/types/Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import socketIo from "socket.io-client";

export const useOrdersController = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: orders } = useQuery({
    queryKey: ["get", "orders", user.orgId],
    queryFn: async () => {
      return await OrderService.getOrders({ orgId: user.orgId });
    },
  });

  const { mutateAsync: cancelOrder, isPending: cancelingOrder } = useMutation({
    mutationFn: async (orderId: string) =>
      await OrderService.cancelOrder({ orderId, orgId: user.orgId }),
  });

  const { mutateAsync: updateOrder, isPending: updatingOrder } = useMutation({
    mutationFn: async ({
      status,
      orderId,
    }: {
      status: OrderStatus;
      orderId: string;
    }) =>
      await OrderService.updateOrder({ orderId, orgId: user.orgId, status }),
  });

  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_BACKEND_URL, {
      transports: ["websocket"],
    });

    socket.on("orders@restart_day", () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });

    socket.on("orders@new", () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });

    return () => {
      socket.close();
    };
  }, []);

  const waiting = orders
    ? orders.filter((order) => order.status === "WAITING")
    : [];
  const inProduction = orders
    ? orders.filter((order) => order.status === "IN_PRODUCTION")
    : [];
  const done = orders ? orders.filter((order) => order.status === "DONE") : [];

  const handleCancelOrder = async (orderId: string) => {
    await cancelOrder(orderId);
    queryClient.invalidateQueries({ queryKey: ["get", "orders", user.orgId] });
  };

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    await updateOrder({ orderId, status });
    queryClient.invalidateQueries({ queryKey: ["get", "orders", user.orgId] });
  };

  return {
    done,
    waiting,
    inProduction,
    handleCancelOrder,
    handleStatusChange,
    cancelingOrder,
    updatingOrder,
  };
};
