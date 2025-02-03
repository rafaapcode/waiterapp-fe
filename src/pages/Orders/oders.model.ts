import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { OrdersViewType } from "./orders.type";

export const useOrdersModel = (): OrdersViewType => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order: any) => {
      const newOrder = {
        _id: order._id,
        table: order.table,
        status: order.status,
        products: order.products,
        createdAt: order.createdAt
      };
      setOrders(prev => [...prev, newOrder]);
    });
  }, []);

  useEffect(() => {
    api.get("/order").then(({ data }) => {
      setOrders(data);
    });
  }, []);
  const waiting = orders ? orders.filter((order) => order.status === "WAITING") : [];
  const inProduction = orders ? orders.filter(
    (order) => order.status === "IN_PRODUCTION"
  ) : [];
  const done = orders ? orders.filter((order) => order.status === "DONE") : [];

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order._id !== orderId));
  };

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  };

  return {
   props: {
    done,
    waiting,
    inProduction,
    handleCancelOrder,
    handleStatusChange
   }
  }
};
