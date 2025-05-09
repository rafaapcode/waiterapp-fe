import { apiclient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import socketIo from "socket.io-client";
import { Order } from "../../types/Order";
import { OrdersViewType } from "./orders.type";

export const useOrdersModel = (): OrdersViewType => {
  const queryClient = useQueryClient();

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<Order[]> => {
      const {data: orders} = await apiclient.get("/order");
      return orders;
    }
  });
  const {mutateAsync: cancelOrderMutation} = useMutation({
    mutationFn: async (orderId: string) => await apiclient.delete(`/order/${orderId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['orders']})
    },
  })
    const {mutateAsync: updateOrderMutation} = useMutation({
    mutationFn: async (data: {orderId: string; status: Order['status']}) => await apiclient.patch(`/order/${data.orderId}`, { status: data.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['orders']})
    },
  })

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("orders@restart_day", () => {
      console.log('ordens resetadas');
      queryClient.invalidateQueries({queryKey: ['orders']})
    });


    socket.on("orders@new", (order: any) => {
      const newOrder = {
        _id: order._id,
        table: order.table,
        status: order.status,
        products: order.products,
        createdAt: order.createdAt,
      };
      console.log('Chegou novo pedido', newOrder);

      queryClient.invalidateQueries({queryKey: ['orders']})
    });

    return () => {
      socket.close();
    }
  }, []);

  const waiting = orders
    ? orders.filter((order) => order.status === "WAITING")
    : [];
  const inProduction = orders
    ? orders.filter((order) => order.status === "IN_PRODUCTION")
    : [];
  const done = orders ? orders.filter((order) => order.status === "DONE") : [];

  const handleCancelOrder = async (orderId: string) => {
    await cancelOrderMutation(orderId);
  };

  const handleStatusChange = async (
    orderId: string,
    status: Order["status"]
  ) => {
    await updateOrderMutation({orderId, status});
  };

  return {
    props: {
      done,
      waiting,
      inProduction,
      handleCancelOrder,
      handleStatusChange,
    },
  };
};
