import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import OrdersBoard from "../OrdersBoard/OrdersBoard";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders(prev => prev.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get("/orders").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  const waiting = orders.filter((order) => order.status === "WAITING");
  const inProduction = orders.filter(
    (order) => order.status === "IN_PRODUCTION"
  );
  const done = orders.filter((order) => order.status === "DONE");

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

  return (
    <div className="w-full max-w-[1216px] my-10 mx-auto flex gap-8">
      <OrdersBoard
        orders={waiting}
        icon="🕛"
        title="Fila de espera"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
      <OrdersBoard
        orders={inProduction}
        icon="🍪"
        title="Em preparação"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
      <OrdersBoard
        orders={done}
        icon="🆗"
        title="Concluído"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
    </div>
  );
}

export default Orders;
